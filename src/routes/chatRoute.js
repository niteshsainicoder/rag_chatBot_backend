import { Router } from "express";
import { getHistory, handleQuery, resetSession, startSession } from "../controllers/chatController.js";
const chatRouter = Router();

chatRouter.get('/', startSession)
chatRouter.post('/ask', handleQuery)
chatRouter.get('/history/:sessionId', getHistory)
chatRouter.get('/reset/histroy/:sessionId',resetSession)

export {chatRouter}