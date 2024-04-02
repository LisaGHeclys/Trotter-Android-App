import {Callback} from "../../core/utils/api/ApiUtils.ts";

export interface UserRepository {
  getUser: (callback: Callback) => void;
  updateUser: (callback: Callback) => void;
  deleteUser: (callback: Callback) => void;
}