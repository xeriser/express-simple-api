import * as express from "express";
import { errorHandler } from "./errorHandler";
import userRoutes from "./users/users.controller";

const app = express();

const port = 8080;

app.use(express.json());

app.use("/api/v1", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server started");
});
