import UserRepositoyIpm from "../../data/firebase/repositories/user/UserRepositoryImp";
import UserEntity, {
  OutEmailPasswordToUser,
} from "../../core/userEntity";

export default class UserService {
  private static repository = new UserRepositoyIpm();

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
