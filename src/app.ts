import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./api/controllers/userController";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/user", router);

app.use("/", (_req, res) => {
  res.status(200).json({ message: "hello word" });
});

export default app;
