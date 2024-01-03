export const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

export interface Callback {
  onSuccess: (response: Response) => void;
  onFailure: (error: string) => void;
}

export const MOBILE_SERVER_URL = process.env.REACT_APP_MOBILE_SERVER_URL