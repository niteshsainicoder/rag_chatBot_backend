import { Router } from "express";
import { ingestArticles } from "../controllers/ingestController.js";
const ingestRoute = Router();

ingestRoute.post("/",ingestArticles)

export {ingestRoute}