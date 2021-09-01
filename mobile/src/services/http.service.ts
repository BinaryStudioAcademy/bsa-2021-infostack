import { NativeEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpError } from 'exceptions/exceptions';
import {
  ContentType,
  HttpHeader,
  HttpMethod,
  LocalStorageVariable,
  HttpCode,
  EmitterEvents,
} from 'common/enums';
import { HttpOptions } from 'common/types';

class Http {
  private areTokensRefreshing;
  private emitter;

  constructor() {
    this.areTokensRefreshing = false;
    this.emitter = new NativeEventEmitter();
  }

  public async load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    try {
      return await this.sendRequest(url, options);
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
      const token =
        accessToken ||
        (await AsyncStorage.getItem(LocalStorageVariable.ACCESS_TOKEN));
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

      const resContentType = response.headers.get('content-type');
      if (resContentType && resContentType.includes(ContentType.TEXT)) {
        return response.text() as unknown as T;
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
      this.emitter.addListener(
        EmitterEvents.GET_ACCESS_TOKEN,
        async (AccessToken) => {
          resolve(await this.sendRequest(url, options, AccessToken));
        },
      );
    });
  }

  private refreshTokens = async (err: Error): Promise<string> => {
    const refreshToken = await AsyncStorage.getItem(
      LocalStorageVariable.REFRESH_TOKEN,
    );
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
        await AsyncStorage.setItem(
          LocalStorageVariable.ACCESS_TOKEN,
          tokens.accessToken,
        );
        await AsyncStorage.setItem(
          LocalStorageVariable.REFRESH_TOKEN,
          tokens.refreshToken,
        );
        this.areTokensRefreshing = false;
        return tokens.accessToken;
      } catch (error) {
        if (error.status === HttpCode.UNAUTHORIZED) {
          await AsyncStorage.removeItem(LocalStorageVariable.ACCESS_TOKEN);
          await AsyncStorage.removeItem(LocalStorageVariable.REFRESH_TOKEN);
          // window.location.href = '/'; TODO
        }
        this.throwError(error);
      }
    } else {
      this.throwError(err);
    }
  };
}

export const http = new Http();
