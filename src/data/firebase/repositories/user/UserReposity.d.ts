import UserEntity, {
  OutEmailPasswordIdToUser,
  OutEmailPasswordToUser,
} from "../../entities/userEntity";

type result<T, U> = Promise<{ content: T | U }>;

export default interface UserRepository {
  createUser: (user: UserEntity) => result<string, null>;
  updateUser: (
    user: OutEmailPasswordToUser,
  ) => result<OutEmailPasswordIdToUser, null>;
  findByEmail: (user: UserEntity["email"]) => result<UserEntity, null>;
  deleteUser: (user: UserEntity["email"]) => result<string, null>;
}
