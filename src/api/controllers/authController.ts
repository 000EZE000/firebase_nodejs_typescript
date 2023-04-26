import { Router, Request, Response } from "express";

import UserService from "../services/UserServices";
import { STATUS } from "../util/statusResponse";

const router = Router();

router.post("/signUp", async ({ body }: Request, res: Response) => {
  try {
    const { failed, content } = await UserService.createUser(body);

    const returnStatus = failed ? STATUS.BAD_REQUEST : STATUS.CREATE;

    return res.status(returnStatus).json({ content });
  } catch (error: any) {
    return res.status(STATUS.ERROR_SERVER).json({ content: error.message });
  }
});

export default router;
