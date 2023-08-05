import { Router } from "express";
import * as UserController from "../controllers/userController";
const router = Router();

router.route("/").get(UserController.getAllUsers);

export default router;
