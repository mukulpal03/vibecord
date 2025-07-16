import { authCallback } from "../controllers/auth";
import { Router } from "express";

const router = Router();

router.route("/callback").post(authCallback);

export default router;
