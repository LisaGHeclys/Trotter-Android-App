import {Callback} from "../../core/utils/api/ApiUtils.ts";

export interface AuthenticationRepository {
  login: (email: string, pwd: string, callback: Callback) => void;
  register: (email: string, pwd: string, callback: Callback) => void;
  oAuth: (title: string, callback: OAuthCallback) => void;
}

export interface OAuthCallback {
  onFailure: (error: string) => void;
}