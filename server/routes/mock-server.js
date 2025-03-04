import express from 'express';
import { db } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';
import sessionsRouter from './session.js';
import stubsRouter from './stubs.js';
import { fileURLToPath } from 'url';
import path from 'path';
import handlerRouter from './handlers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.use('/handlers', handlerRouter);
router.use('/sessions', sessionsRouter);
router.use('/stubs', stubsRouter);

const staticPath = path.join(__dirname, '../../client/dist'); // Путь к папке с build-файлами
router.use(express.static(staticPath));
router.use('/mock-server', express.static(staticPath, { cacheControl: false }));

// Обработка всех остальных маршрутов внутри /mock-server/*
router.get('/mock-server/*', (req, res) => {
    const indexPath = path.join(staticPath, 'index.html');
    res.sendFile(indexPath); // Возвращаем index.html для всех маршрутов внутри /mock-server/*
});


export default router;