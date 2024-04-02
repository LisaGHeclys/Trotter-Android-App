import {UserRepository} from "../domain/UserRepository.tsx";
import {Callback} from "../../core/utils/api/ApiUtils.ts";

class UserRepositoryImpl implements  UserRepository {
  async deleteUser(callback: Callback): Promise<void> {
  }

  async getUser(callback: Callback): Promise<void> {
  }

  async updateUser(callback: Callback): Promise<void> {
  }
}