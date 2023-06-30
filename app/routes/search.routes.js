import { Router } from "express";
import { searchByName } from "../controllers/search.controller.js";


const router = Router();

router.get(
    "/",
    searchByName
);

export default router;