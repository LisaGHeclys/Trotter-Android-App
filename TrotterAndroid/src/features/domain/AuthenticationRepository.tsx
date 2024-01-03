import {AuthCallback} from "../../core/utils/ApiUtils.ts";

export interface AuthenticationRepository {
  login: (email: string, pwd: string, callback: AuthCallback) => void;
  register: (email: string, pwd: string, callback: AuthCallback) => void;
}