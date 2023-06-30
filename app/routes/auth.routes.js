import { Router } from "express";
import { check } from "express-validator";
import { register, login } from "../controllers/auth.controller.js";
import { existEmailValid } from "../helpers/db-validators.js";
import { validRequest } from "../middlewares/valid-data.js";


const router = Router();

router.post(
    "/login",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password required").not().isEmpty(),
    ],
    validRequest,
    login
);

router.post(
    "/register",
    [
        check("password", "the password must have at least 6 letters").isLength({
            min: 6,
        }),
        check("email").custom(existEmailValid),
    ],
    validRequest,
    register
);

export default router;