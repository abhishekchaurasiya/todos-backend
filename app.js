import express from "express";
import userRouters from "./routes/userRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cors from "cors"
import cookie_parser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookie_parser())

app.use("/api/v1", userRouters);

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "I am running inside docker container" });
});

app.use(errorMiddleware);

export default app;
