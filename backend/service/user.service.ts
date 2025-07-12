import Users from "../models/userModel";
import type { RegisterUser, User } from "../validators/user.validator";

export class UserService {
  async getUserById(id: string) {
    return Users.findById(id);
  }

  async getUserByEmail(email: string) {
    return Users.findOne({ email });
  }

  async createUser(user: RegisterUser, hash: string) {
    return Users.create({
      email: user.email,
      name: user.name,
      hash,
    });
  }

  async updateUser(id: string, user: Partial<User>) {
    return Users.updateOne({ _id: id }, { $set: user });
  }

  async deleteUser(id: string) {
    return Users.deleteOne({ _id: id });
  }

  async getAllPublicUsers() {
    return Users.find({ public: true }).select("-hash -__v");
  }
}
