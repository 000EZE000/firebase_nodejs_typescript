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
  static hashPassword = HashPassword.hashPassword;

  public static signUp = async (body: paramUserOutId) => {
    const isRepeatEmail = await this.findByEmail(body.email);
    if (isRepeatEmail.content !== null)
      return {
        content: "the user already registered",
        failed: true,
      };
    const user = await this.hashPassword({ ...body, id: uuid() });
    const responseRepository = await this.repository.createUser(user);
    return { ...responseRepository, failed: false };
  };

  static signIn = async ({ password, email }: onlyEmailAndPassword) => {
    const userFound = await this.findByEmail(email);
    const userIsEmpty = userFound.content === null;
    const messageError = {
      content: "the password or the email is wrong",
      failed: true,
    };
    if (userIsEmpty) return messageError;
    const passwordIsWrong = !(await this.checkPassword(
      password,
      userFound.content.password,
    ));
    if (passwordIsWrong) return messageError;
    const token = this.generateToken(userFound.content.id, "1d");
    const { password: pass, id, ...user } = userFound.content;
    return { content: { user, token }, failed: false };
  };
}
