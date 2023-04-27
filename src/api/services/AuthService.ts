import User from "../../core/User";
import { onlyEmailAndPassword, paramUserOutId } from "../../core/userEntity";
import UserRepositoyIpm from "../../data/firebase/repositories/user/UserRepositoryImp";
import TokenUtils from "../util/jwt";
import HashPassword from "../util/validation/hasPassword";
import UserService from "./UserServices";
import { v4 as uuid } from "uuid";

export default class AuthService {
  static repository = new UserRepositoyIpm();
  static findByEmail = UserService.findUserByEmail;
  static checkPassword = HashPassword.comparePassword;
  static generateToken = TokenUtils.generateToken;

  public static signUp = async (user: paramUserOutId) => {
    const isRepeatEmail = await this.findByEmail(user.email);

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

  static signIn = async ({ password, email }: onlyEmailAndPassword) => {
    const userFound = await this.findByEmail(email);

    if (userFound.content === null)
      return { content: "the password or the email is wrong", failed: true };

    if (!(await this.checkPassword(password, userFound.content.password)))
      return { content: "the password or the email is wrong", failed: true };

    const token = this.generateToken(userFound.content.id, "1d");

    const { password: pass, id, ...user } = userFound.content;

    return { content: { user, token }, failed: false };
  };
}
