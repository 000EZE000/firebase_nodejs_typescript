import { Router } from "express";
import UserService from "../services/UserServices";
import { STATUS } from "../util/statusResponse";
import {
  middlewareCheckToken,
  middlewareCheckTokenAndUser,
} from "../middlewares/middlewareUser";
import authRequest from "../global/typeExpress";

const router = Router();
router.put("/update", middlewareCheckTokenAndUser, async (req, res) => {
  try {
    const body = { ...req.body, id: (req as authRequest).userId };
    const responseSevice = await UserService.updateUser(body);
    return res.status(STATUS.OK).json(responseSevice);
  } catch (error: any) {
    return res.status(STATUS.ERROR_SERVER).json({ content: error.message });
  }
});

router.get("/profile", middlewareCheckToken, async (req, res) => {
  try {
    const { userId } = req as authRequest;
    const responseSevice = await UserService.getUser(userId);
    return res.status(STATUS.OK).json(responseSevice);
  } catch (error: any) {
    return res.status(STATUS.ERROR_SERVER).json({ content: error.message });
  }
});

router.delete("/delete", middlewareCheckToken, async (req, res) => {
  try {
    const { userId } = req as authRequest;
    const responseService = await UserService.deleteUser(userId);
    return res.status(STATUS.OK).json(responseService);
  } catch (error: any) {
    return res.status(STATUS.ERROR_SERVER).json({ content: error.message });
  }
});

export default router;
