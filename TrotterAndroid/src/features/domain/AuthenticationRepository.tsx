export interface AuthenticationRepository {
  login: (email: string, pwd: string, callback: AuthCallback) => void;
  register: (email: string, pwd: string, callback: AuthCallback) => void;
}

export interface AuthCallback {
  onSuccess: (response: Response) => void;
  onFailure: (error: string) => void;
}