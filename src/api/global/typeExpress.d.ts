import { Request } from "express";
export default interface authRequest extends Request {
  userId: string;
}
