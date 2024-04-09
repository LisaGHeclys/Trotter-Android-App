import {Linking} from "react-native";
import {AuthenticationRepository, OAuthCallback} from "../domain/AuthenticationRepository.tsx";
import {Callback, headers, MOBILE_SERVER_URL} from "../../core/utils/api/ApiUtils.ts";

class AuthenticationRepositoryImpl implements AuthenticationRepository {

  async login(email: string, pwd: string, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          email: email,
          password: pwd,
        }),
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while logging the user ${error}`);
    }
  }

  async register(email: string, pwd: string, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/auth/register`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          username: email,
          email: email,
          password: pwd})
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure("An error occurred while creating a new user");
    }
  }

  async oAuth(title: string, callback: OAuthCallback) {
    try {
      await Linking.openURL(`${MOBILE_SERVER_URL}/auth/${title}`);
    } catch (error: any) {
      callback.onFailure("An error occurred while opening the browser");
    }
  }
}

export default new AuthenticationRepositoryImpl();