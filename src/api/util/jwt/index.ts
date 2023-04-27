import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/environment";
import UserEntity from "../../../core/userEntity";

export default class TokenUtils {
  static generateToken(id: UserEntity["id"], expiresIn: string = "12d") {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn });
  }
}
