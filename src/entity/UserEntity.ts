import { ObjectId } from "mongodb";

interface UserEntity {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  createdAt?: Date;
}

export default UserEntity;
