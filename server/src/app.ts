import "dotenv/config";
import express from "express";
const app = express();
import morgan from "morgan";
import createHttpError from "http-errors";
import ErrorHandler from "./errors/ErrorHandler";
import cors from "cors";

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Routes
import userRouter from "./routes/userRoutes";
import noteRouter from "./routes/noteRoutes";

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Route don't exist"));
});

app.use(ErrorHandler);

export default app;
