import express from "express";
import cors from "cors";
import morgan from "morgan";
import routerUser from "./api/controllers/userController";
import routerAuth from "./api/controllers/authController";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/user", routerUser);
app.use("/auth", routerAuth);

app.use("/", (_req, res) => {
  res.status(200).json({ message: "hello word" });
});

export default app;
