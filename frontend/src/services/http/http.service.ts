import EventEmitter from 'events';
import { store } from 'store/store';
import { HttpError } from 'exceptions/exceptions';
import {
  ContentType,
  HttpHeader,
  HttpMethod,
  LocalStorageVariable,
  HttpCode,
  EmitterEvents,
} from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';
import { authActions } from 'store/auth';

class Http {
  private areTokensRefreshing;
  private emitter;

  constructor() {
    this.areTokensRefreshing = false;
    this.emitter = new EventEmitter();
  }

  public async load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    try {

      return this.sendRequest(url, options);

    } catch (err) {

      if (err.status === HttpCode.UNAUTHORIZED) {
        if (this.areTokensRefreshing) {
          return await this.sendRequestAfterGetToken(url, options);
        } else {
          this.areTokensRefreshing = true;
          const accessToken = await this.refreshTokens(err);
          return await this.sendRequest(url, options, accessToken);
        }
      } else {
        this.throwError(err);
      }

    }
  }

  public async sendRequest<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
    accessToken?: string,
  ): Promise<T> {
    try {

      const { method = HttpMethod.GET, payload = null, contentType } = options;
      const token = accessToken || localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
      const headers = this.getHeaders(contentType, token);

      const response = await fetch(url, {
        method,
        headers,
        body: payload,
      });

      await this.checkStatus(response);

      if (response.status === HttpCode.NO_CONTENT) {
        return null as unknown as T;
      }

      return this.parseJSON<T>(response);

    } catch (err) {
      this.throwError(err);
    }
  }

  private getHeaders(
    contentType?: ContentType,
    token?: string | null,
  ): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (token) {
      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const error = await response.json();
      throw new HttpError({
        status: response.status,
        message: error.msg || error.error,
      });
    }

    return response;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: Error): never {
    throw err;
  }

  public async sendRequestAfterGetToken<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    return new Promise((resolve) => {
      this.emitter.on(EmitterEvents.GET_ACCESS_TOKEN, async (AccessToken) => {
        resolve(await this.sendRequest(url, options, AccessToken));
      });
    });
  }

  private refreshTokens = async (
    err: Error,
  ): Promise<string> => {
    const refreshToken = localStorage.getItem(LocalStorageVariable.REFRESH_TOKEN);
    if (refreshToken) {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: HttpMethod.POST,
          body: JSON.stringify({ refreshToken }),
          headers: this.getHeaders(ContentType.JSON),
        });
        await this.checkStatus(response);
        const tokens = await response.json();
        this.emitter.emit(EmitterEvents.GET_ACCESS_TOKEN, tokens.accessToken);
        this.areTokensRefreshing = false;
        localStorage.setItem(LocalStorageVariable.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(LocalStorageVariable.REFRESH_TOKEN, tokens.refreshToken);
        return tokens.accessToken;
      } catch (error) {
        if (error.status === HttpCode.UNAUTHORIZED) {
          localStorage.removeItem(LocalStorageVariable.ACCESS_TOKEN);
          localStorage.removeItem(LocalStorageVariable.REFRESH_TOKEN);
          store.dispatch(authActions.ToggleIsRefreshTokenExpired());
        }
        this.throwError(error);
      }
    } else {
      this.throwError(err);
    }
  };
}

export { Http };
