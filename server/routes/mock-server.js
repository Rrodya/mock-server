import express from 'express';
import { db } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';
import sessionsRouter from './session.js';
import stubsRouter from './stubs.js';
import handlerRouter from './handlers.js';


const router = express.Router();

router.use('/handlers', handlerRouter);
router.use('/sessions', sessionsRouter);
router.use('/stubs', stubsRouter);

export default router;