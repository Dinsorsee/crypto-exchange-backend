import { UserRepository } from "../datasource/user-repository";
import UserEntity from "../entity/UserEntity";
import { ObjectId } from "mongodb";

export class UserService {
  private userRepository = new UserRepository();

  async createUser(email: string, passwordHash: string): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    return this.userRepository.create({ email, passwordHash });
  }

  async getAllUsers(): Promise<UserEntity[] | null> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string | ObjectId): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }
}
