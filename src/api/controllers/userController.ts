import { Router, Request, Response } from "express";

import UserService from "../services/UserServices";
import { STATUS } from "../util/statusResponse";

const router = Router();

router.post("/create", async ({ body }: Request, res: Response) => {
  try {
    const responseService = await UserService.createUser(body);

    if (responseService.failed)
      return res.status(STATUS.BAD_REQUEST).json(responseService);

    return res.status(STATUS.CREATE).json(responseService);
  } catch (error: any) {
    return res.status(STATUS.ERROR_SERVER).send({ content: error.message });
  }
});

router.put("/update", async ({ body }: Request, req: Response) => {
  try {
    const responseSevice = await UserService.updateUser(body);
    return req.status(STATUS.OK).json(responseSevice);
  } catch (error: any) {
    return req.status(STATUS.ERROR_SERVER).json({ content: error.message });
  }
});

router.delete(
  "/delete/:id",
  async ({ params: { id } }: Request, res: Response) => {
    try {
      const responseService = await UserService.deleteUser(id);
      return res.status(STATUS.OK).json(responseService);
    } catch (error: any) {
      return res.status(STATUS.ERROR_SERVER).json({ content: error.message });
    }
  },
);
export default router;
