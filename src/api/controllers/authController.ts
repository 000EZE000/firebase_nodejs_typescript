import { Router, Request, Response } from "express";
import { STATUS } from "../util/statusResponse";
import AuthService from "../services/AuthService";

const router = Router();

router.post("/signUp", async ({ body }: Request, res: Response) => {
  try {
    const { failed, content } = await AuthService.signUp(body);

    const returnStatus = failed ? STATUS.BAD_REQUEST : STATUS.CREATE;

    return res.status(returnStatus).json({ content });
  } catch (error: any) {
    return res.status(STATUS.ERROR_SERVER).json({ content: error.message });
  }
});

router.post("/signIn", async ({ body }: Request, res: Response) => {
  const { content, failed } = await AuthService.signIn(body);

  if (failed || typeof content === "string")
    return res.status(STATUS.BAD_REQUEST).json({ content });

  return res
    .status(STATUS.OK)
    .header("token", content.token)
    .json({ content: content.user });
});

export default router;
