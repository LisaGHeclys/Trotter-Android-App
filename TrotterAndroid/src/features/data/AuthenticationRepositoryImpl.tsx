import {AuthenticationRepository} from "../domain/AuthenticationRepository.tsx";
import {AuthCallback, headers, MOBILE_SERVER_URL} from "../../core/utils/ApiUtils.ts";

class AuthenticationRepositoryImpl implements AuthenticationRepository {
  async login(email: string, pwd: string, callback: AuthCallback): Promise<void> {
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
      //toSetup Toaster for mobile
    }
  }

  async register(email: string, pwd: string, callback: AuthCallback): Promise<void> {
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
      //toSetup Toaster for mobile
    }
  }
}

export default new AuthenticationRepositoryImpl();