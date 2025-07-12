import Users from "../models/userModel";
import type { User } from "../validators/user.validator";

export class UserService {
  async getUserById(id: string) {
    return Users.findById(id);
  }

  async createUser(user: User) {
    return Users.create(user);
  }

  async updateUser(id: string, user: Partial<User>) {
    return Users.updateOne({ _id: id }, { $set: user });
  }

  async deleteUser(id: string) {
    return Users.deleteOne({ _id: id });
  }
}
