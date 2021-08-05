import { store } from 'store/store';
import { HttpError } from 'exceptions/exceptions';
import {
  ContentType,
  HttpHeader,
  HttpMethod,
  LocalStorageVariable,
  HttpCode,
} from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';
import { authActions } from 'store/auth';

class Http {
  public async load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    try {
      const { method = HttpMethod.GET, payload = null, contentType } = options;
      const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
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

      if (err.status === HttpCode.UNAUTHORIZED) {
        const response = await this.handleAccessTokenExpiredError(url, options, err);
        return this.parseJSON<T>(response);
      } else {
        this.throwError(err);
      }

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

  private handleAccessTokenExpiredError = async (
    url: string,
    options: Partial<HttpOptions> = {},
    err: Error,
  ): Promise<Response> => {
    const refreshToken = localStorage.getItem(LocalStorageVariable.REFRESH_TOKEN);
    if (refreshToken) {
      try {
        const res = await fetch('/api/auth/refresh', {
          method: HttpMethod.POST,
          body: JSON.stringify({ refreshToken }),
          headers: this.getHeaders(ContentType.JSON),
        });
        await this.checkStatus(res);
        const tokens = await res.json();
        localStorage.setItem(LocalStorageVariable.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(LocalStorageVariable.REFRESH_TOKEN, tokens.refreshToken);
        const { method = HttpMethod.GET, payload = null, contentType } = options;
        const headers = this.getHeaders(contentType, tokens.accessToken);
        const response = await fetch(url, {
          method,
          headers,
          body: payload,
        });
        return response;
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
