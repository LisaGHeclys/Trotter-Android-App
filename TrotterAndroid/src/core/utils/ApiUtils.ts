export const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

export interface AuthCallback {
  onSuccess: (response: Response) => void;
  onFailure: (error: string) => void;
}

export const MOBILE_SERVER_URL = process.env.MOBILE_SERVER_URL