import {
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import UserRepository from "./UserReposity";
import UserModel from "../../models/userModel";
import UserEntity, {
  OutEmailPasswordToUser,
} from "../../../../core/userEntity";

export default class UserRepositoyIpm implements UserRepository {
  createUser = async (user: UserEntity) => {
    try {
      await setDoc(UserModel.run(user.id), user);
      return {
        content: "the user has been create successfully",
      };
    } catch (error: any) {
      console.log(error.message);
      return { content: null };
    }
  };

  updateUser = async (user: OutEmailPasswordToUser) => {
    try {
      const { id, ...userWithoutId } = user;
      await updateDoc(UserModel.run(id), userWithoutId);
      return {
        content: userWithoutId,
      };
    } catch (error: any) {
      return { content: null };
    }
  };

  findByEmail = async (email: UserEntity["email"]) => {
    try {
      const getUsers = await getDocs(UserModel.find(email));
      if (getUsers.empty) throw new Error();
      const user = getUsers.docs[0].data() as UserEntity;
      return { content: user };
    } catch (error: any) {
      return { content: null };
    }
  };

  findById = async (id: UserEntity["id"]) => {
    try {
      const getUser = (await getDoc(UserModel.run(id))).data() as UserEntity;
      if (!getUser) return { content: null };
      return { content: getUser };
    } catch (error: any) {
      return { content: null };
    }
  };

  deleteUser = async (id: UserEntity["id"]) => {
    try {
      await deleteDoc(UserModel.run(id));
      return { content: "the user has been deleted successfully" };
    } catch (error: any) {
      return { content: null };
    }
  };
}
