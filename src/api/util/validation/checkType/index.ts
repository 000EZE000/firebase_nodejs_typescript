import { keysUserEntity } from "../../../../core/userEntity";

export const isEmptyProperty = (value: any, keys: any[]) => {
  for (let i = 0; i < keys.length; i++) {
    if (!value[keys[i]]) return true;
  }
  return false;
};

export const isNotString = (value: any) => typeof value !== "string";

export const isNotNumber = (value: any) => typeof value !== "number";

export const isNotUser = (body: any) => {
  const keysUserEntity: keysUserEntity = [
    "lastName",
    "phone",
    "firstName",
    "email",
    "password",
  ];
  return isEmptyProperty(body, keysUserEntity);
};

export const isNotLogin = (body: any) => {
  const keyLoginEntity: keysUserEntity = ["email", "password"];
  return isEmptyProperty(body, keyLoginEntity);
};

export const isNotEmail = (value: any) =>
  isNotString(value) ||
  !value[5] ||
  !value.match(/@/) ||
  value.match(/ /) ||
  value.match(/[^\w@.]/);

export const isNotPassword = (value: any) =>
  isNotString(value) ||
  !value[8] ||
  !value.match(/[1-9]/) ||
  !value.match(/[A-Z]/) ||
  value.match(/ /);

export const isNotName = (value: any) =>
  isNotString(value) || !value[3] || value.match(/ /) || value.match(/[\W]/);

export const isNotPhone = (value: any) => isNotNumber(value) || !`${value}`[6];

export const isBodyIncorrectSignUp = (body: any) =>
  isNotUser(body) ||
  isNotName(body.lastName) ||
  isNotName(body.firstName) ||
  isNotEmail(body.email) ||
  isNotPassword(body.password) ||
  isNotPhone(body.phone);

export const isBodyIncorrectSignIn = (body: any) =>
  isNotLogin(body) || isNotEmail(body.email) || isNotPassword(body.password);

export const DEBUG_SIGN_UP = (body: any) => {
  console.log(isNotUser(body));
  console.log(isNotName(body.lastName));
  console.log(isNotName(body.firstName));
  console.log(isNotEmail(body.email));
  console.log(isNotPassword(body.password));
  console.log(isNotPhone(body.phone));
};

export const DEBUG_SIGN_IN = (body: any) => {
  console.log(isNotLogin(body));
  console.log(isNotEmail(body.email));
  console.log(isNotPassword(body.password));
};
