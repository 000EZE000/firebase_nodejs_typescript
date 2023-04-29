import { NextFunction, Request, Response } from "express";
import { STATUS } from "../util/statusResponse";
import TokenUtils from "../util/jwt";
import authRequest from "../global/typeExpress";
import { isBodyIncorrectUpdateUser } from "../util/validation/checkType";

interface Itoken {
  id: string;
  iat: number;
  exp: number;
}

type typeMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export const middlewareCheckToken: typeMiddleware = (req, res, next) => {
  const token = req.header("token");
  if (typeof token !== "string")
    return res.status(STATUS.UNAUTHORIZED).json({ content: "token not sent" });
  try {
    const idUser = TokenUtils.checkToken(token) as Itoken;
    (req as authRequest).userId = idUser.id;
  } catch (error) {
    return res.status(STATUS.UNAUTHORIZED).json({ content: "token invalid" });
  }
  next();
};

const messageError = { content: "the information sent is incorrect" };

export const middlewareCheckTokenAndUser: typeMiddleware = (req, res, next) => {
  const token = req.header("token");
  if (typeof token !== "string")
    return res.status(STATUS.UNAUTHORIZED).json({ content: "token not sent" });
  if (isBodyIncorrectUpdateUser(req.body))
    return res.status(STATUS.BAD_REQUEST).json(messageError);
  try {
    const idUser = TokenUtils.checkToken(token) as Itoken;
    (req as authRequest).userId = idUser.id;
  } catch (error) {
    return res.status(STATUS.UNAUTHORIZED).json({ content: "token invalid" });
  }
  next();
};
