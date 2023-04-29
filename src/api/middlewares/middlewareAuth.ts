import { NextFunction, Request, Response } from "express";
import {
  isBodyIncorrectSignIn,
  isBodyIncorrectSignUp,
} from "../util/validation/checkType";
import { STATUS } from "../util/statusResponse";

type typeMiddleware = (req: Request, res: Response, next: NextFunction) => void;

const messageError = { content: "the information sent is incorrect" };

export const singUpMiddleware: typeMiddleware = ({ body }, res, next) => {
  if (isBodyIncorrectSignUp(body))
    return res.status(STATUS.BAD_REQUEST).json(messageError);
  next();
};

export const signInMiddlware: typeMiddleware = ({ body }, res, next) => {
  if (isBodyIncorrectSignIn(body))
    return res.status(STATUS.BAD_REQUEST).json(messageError);
  next();
};
