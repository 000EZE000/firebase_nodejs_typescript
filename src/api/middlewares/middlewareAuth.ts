import { NextFunction, Request, Response } from "express";
import {
  DEBUG_SIGN_IN,
  DEBUG_SIGN_UP,
  isBodyIncorrectSignIn,
  isBodyIncorrectSignUp,
} from "../util/validation/checkType";
import { STATUS } from "../util/statusResponse";

type typeMiddleware = (req: Request, res: Response, next: NextFunction) => void;

const messageError = { content: "the information sent is incorrect" };

export const singUpMiddleware: typeMiddleware = ({ body }, res, next) => {
  DEBUG_SIGN_UP(body);
  if (isBodyIncorrectSignUp(body))
    return res.status(STATUS.BAD_REQUEST).json(messageError);
  next();
};

export const signInMiddlware: typeMiddleware = ({ body }, res, next) => {
  DEBUG_SIGN_IN(body);
  if (isBodyIncorrectSignIn(body))
    return res.status(STATUS.BAD_REQUEST).json(messageError);
  next();
};
