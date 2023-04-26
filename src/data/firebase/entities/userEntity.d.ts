import exp from "constants";

export default interface UserEntity {
  readonly id: string;
  firstName: string;
  lastName: string;
  phone: number;
  readonly email: string;
  password: string;
}

export type paramUserOutId = Omit<UserEntity, "id">;

export type resultUserOutPasswordAndId = Omit<UserEntity, "id" | "password">;

export type OutEmailPasswordToUser = Omit<UserEntity, "password" | "email">;

export type OutEmailPasswordIdToUser = Omit<UserEntity, "password" | "email" | "id">

export interface useCaseUser {
  getLastName: () => UserEntity["lastName"];
  getFirstName: () => UserEntity["firstName"];
  getPhone: () => UserEntity["phone"];
  getPassword: () => UserEntity["password"];
  getId: () => UserEntity["id"];
  getEmail: () => UserEntity["email"];
  getAllProperty: () => UserEntity;
  setLastName: (lastName: UserEntity["lastName"]) => void;
  setFirstName: (firsName: UserEntity["firstName"]) => void;
  setPhone: (phone: UserEntity["phone"]) => void;
  setPassword: (password: UserEntity["password"]) => void;
}
