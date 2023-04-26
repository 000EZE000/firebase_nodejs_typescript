import bcrypt from "bcrypt";
import UserEntity from "../../entities/userEntity";

export default class HashPassword {
  static hashPassword = async (user: UserEntity) => {
    const SALT_ROUNDS = 10;

    return {
      ...user,
      password: await bcrypt.hash(user.password, SALT_ROUNDS),
    };
  };
}
