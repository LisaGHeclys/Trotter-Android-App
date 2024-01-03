/**
 * @format
 */

import 'react-native';
import AuthenticationRepositoryImpl from "../../src/features/data/AuthenticationRepositoryImpl.tsx";

import {describe, it, jest, expect, afterEach} from '@jest/globals';

describe('AuthenticationRepositoryImpl', () => {
  it('should handle successful login', async () => {
    const email = 'b@b.fr';
    const password = 'b';
    const callbackMock = {
      onSuccess: jest.fn(),
      onFailure: jest.fn(),
    };

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          "accessToken" : process.env.REACT_APP_TEST_TOKEN
        }),
      })
    );

    await AuthenticationRepositoryImpl.login(email, password, callbackMock);

    expect(callbackMock.onSuccess).toHaveBeenCalled();
    expect(callbackMock.onFailure).not.toHaveBeenCalled();
  });

  it('should handle login failure', async () => {
    const email = 'b@b.fr';
    const password = 'a';
    const callbackMock = {
      onSuccess: jest.fn(),
      onFailure: jest.fn(),
    };

    global.fetch = jest.fn(() =>
      Promise.reject('Simulated error')
    );

    await AuthenticationRepositoryImpl.login(email, password, callbackMock);

    expect(callbackMock.onSuccess).not.toHaveBeenCalled();
    expect(callbackMock.onFailure).toHaveBeenCalledWith(
      'An error occurred while logging the user Simulated error'
    );
  });

  it('should handle successful register', async () => {
    const email = 'beef@beef.fr';
    const password = 'beef';
    const callbackMock = {
      onSuccess: jest.fn(),
      onFailure: jest.fn(),
    };

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          "accessToken" : "eyJhbGciOiJIUzI1NiJ9.YkBiLmZy.CbYEJ95qQ8Gydtnn6JpePDvqfc5mzhQQaEsdKYtO7KA"
        }),
      })
    );

    await AuthenticationRepositoryImpl.register(email, password, callbackMock);

    expect(callbackMock.onSuccess).toHaveBeenCalled();
    expect(callbackMock.onFailure).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

