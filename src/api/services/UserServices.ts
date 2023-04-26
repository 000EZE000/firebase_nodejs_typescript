import { v4 as uuid } from "uuid";

import UserEntity, {
  OutEmailPasswordToUser,
  paramUserOutId,
} from "../../data/firebase/entities/userEntity";
import UserRepositoyIpm from "../../data/firebase/repositories/user/UserRepositoryImp";
import User from "../../data/firebase/entities/User";
import HashPassword from "../../data/firebase/repositories/utils/hasPassword";

export default class UserService {
  private static repository = new UserRepositoyIpm();

  public static createUser = async (user: paramUserOutId) => {
    const isRepeatEmail = await this.findUserByEmail(user.email);

    if (isRepeatEmail.content !== null)
      return {
        content: "the user already registered",
        failed: true,
      };

    const userCreate = new User({ ...user, id: uuid() });

    const userFinal = await HashPassword.hashPassword(
      userCreate.getAllProperty(),
    );

    const responseRepository = await this.repository.createUser(userFinal);

    return { ...responseRepository, failed: false };
  };

  public static updateUser = async (user: OutEmailPasswordToUser) => {
    const responseRepository = await this.repository.updateUser(user);

    if (responseRepository.content === null) throw new Error("Error Server");

    return responseRepository;
  };

  public static deleteUser = async (id: UserEntity["id"]) => {
    return await this.repository.deleteUser(id);
  };

  public static findUserByEmail = async (email: UserEntity["email"]) => {
    return await this.repository.findByEmail(email);
  };
}
