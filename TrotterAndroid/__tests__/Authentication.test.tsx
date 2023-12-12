import 'react-native';
import { describe, it, jest, expect, beforeEach } from '@jest/globals';
import { MOBILE_SERVER_URL } from '@env';
import AuthenticationRepositoryImpl from "../src/features/data/AuthenticationRepositoryImpl.tsx";
import {headers} from "../src/core/utils/ApiUtils.ts";

describe('AuthenticationRepositoryImpl', () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  it('login - success', async () => {
    const successResponse = { status: 200, json: jest.fn().mockResolvedValue({ "" }) };
    global.fetch.mockResolvedValue(successResponse);

    const mockCallback = { onSuccess: jest.fn(), onFailure: jest.fn() };

    await AuthenticationRepositoryImpl.login('b@b.fr', 'b', mockCallback);

    expect(global.fetch).toHaveBeenCalledWith(`${MOBILE_SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        email: 'b@b.fr',
        password: 'b',
      }),
    });
    expect(mockCallback.onSuccess).toHaveBeenCalledWith(successResponse);
    expect(mockCallback.onFailure).not.toHaveBeenCalled(); // Make sure onFailure was not called
  });

  it('login - failure', async () => {
    const errorResponse = { status: 500, json: jest.fn().mockResolvedValue({ /* your error response here */ }) };
    global.fetch.mockResolvedValue(errorResponse);

    const mockCallback = { onSuccess: jest.fn(), onFailure: jest.fn() };

    await AuthenticationRepositoryImpl.login('test@example.com', 'password', mockCallback);

    expect(global.fetch).toHaveBeenCalledWith(`${MOBILE_SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password',
      }),
    });

    expect(mockCallback.onFailure).toHaveBeenCalledWith('An error occurred while logging the user Error: An error occurred while logging the user');
    expect(mockCallback.onSuccess).not.toHaveBeenCalled(); // Make sure onSuccess was not called
  });

  it('register - success', async () => {
    const successResponse = { status: 200, json: jest.fn().mockResolvedValue({ "" }) };
    global.fetch.mockResolvedValue(successResponse);

    const mockCallback = { onSuccess: jest.fn(), onFailure: jest.fn() };

    await AuthenticationRepositoryImpl.register('b@b.fr', 'b', mockCallback);

    expect(global.fetch).toHaveBeenCalledWith(`${MOBILE_SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        email: 'b@b.fr',
        password: 'b',
      }),
    });
    expect(mockCallback.onSuccess).toHaveBeenCalledWith(successResponse);
    expect(mockCallback.onFailure).not.toHaveBeenCalled(); // Make sure onFailure was not called
  });

  it('register - failure', async () => {
    const errorResponse = { status: 500, json: jest.fn().mockResolvedValue({ /* your error response here */ }) };
    global.fetch.mockResolvedValue(errorResponse);

    const mockCallback = { onSuccess: jest.fn(), onFailure: jest.fn() };

    await AuthenticationRepositoryImpl.register('test@example.com', 'password', mockCallback);

    expect(global.fetch).toHaveBeenCalledWith(`${MOBILE_SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password',
      }),
    });

    expect(mockCallback.onFailure).toHaveBeenCalledWith('An error occurred while logging the user Error: An error occurred while logging the user');
    expect(mockCallback.onSuccess).not.toHaveBeenCalled(); // Make sure onSuccess was not called
  });

});
