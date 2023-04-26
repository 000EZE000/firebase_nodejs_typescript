import { doc, query, collection, where } from "firebase/firestore";
import db from "../connect";
import UserEntity from "../entities/userEntity";

const NAME_USER = "user";
const KEY_EMAIL = "email";

const userModify = (id: UserEntity["id"]) => doc(db, NAME_USER, id);
const queryToEmail = (email: UserEntity["email"]) =>
  query(collection(db, NAME_USER), where(KEY_EMAIL, "==", email));

class UserModel {
  static run = (id: UserEntity["id"]) => userModify(id);
  static find = (email: UserEntity["email"]) => queryToEmail(email);
}

export default UserModel;
