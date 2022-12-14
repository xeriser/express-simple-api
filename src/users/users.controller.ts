import * as express from "express";
import { joiHandler } from "../joiHandler";
import { addUserValidator, updateUserValidator } from "./user.validators";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

const userRoutes = express.Router();

const userRepo = new UsersRepository();
const usersService = new UsersService(userRepo);

userRoutes.get("/users", (_, res, next) => {
  try {
    const users = usersService.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRoutes.get("/users/:user_id", (req, res, next) => {
  try {
    const id = req.params.user_id;
    const user = usersService.getById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log("error happened here");
    next(error);
  }
});

userRoutes.put(
  "/users/:user_id",
  joiHandler(updateUserValidator),
  (req, res, next) => {
    console.log("put");
    console.log(req.body);
    try {
      const id = req.params.user_id;
      const user = usersService.updateById(id, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRoutes.post("/users", joiHandler(addUserValidator), (req, res, next) => {
  try {
    const user = usersService.add(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRoutes.delete("/users/:user_id", (req, res, next) => {
  try {
    const id = req.params.user_id;
    const user = usersService.deleteById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default userRoutes;
