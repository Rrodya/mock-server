import express from 'express';
import { db } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'node:fs/promises';

const router = express.Router();

/**
 * Загрузка файла стаба
 * @param {File} file - Загруженный файл
 * @param {string} [filename] - Опциональное имя файла (query параметр)
 * @returns {Promise<{ uniqueFileName: string }>} Уникальное имя сохраненного файла
 */
router.post('/file/upload', async (req, res) => {
    try {

        if (!req.files?.file) {
            return res.status(400).json({ code: "file_not_uploaded", error: 'No file uploaded' });
        }
        const file = req.files.file;

        const userFileName = req.query.filename || file.name;
        const fileId = uuidv4();
        const filePath = path.join('stubs', fileId + '.json');

        await file.mv(filePath);

        res.json({
            file_id: fileId,
            original_name: userFileName
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/file/:id', async (req, res) => {
    try {
        const file_id = req.params.id;
        const filePath = path.join('stubs', file_id + '.json');

        await fs.access(filePath);

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="${file_id}.json"`);

        res.sendFile(path.resolve(filePath));
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
})

/**
 * Создание записи о стабе
 * @param {Object} body - Данные стаба
 * @param {string} body.sessionId - ID сессии
 * @param {string} body.name - Название стаба
 * @param {string} [body.description] - Описание
 * @param {string} body.file_id - Уникальное имя файла
 * @returns {Promise<Stub>} Созданный стаб
 */
router.post('/', async (req, res) => {
    try {
        const { sessionId, name, description, fileId } = req.body;

        const filePath = path.join('stubs', fileId + '.json');
        
        try {
            await fs.access(filePath);
        } catch {
            return res.status(404).json({
                code: "file_node_found",
                error: "File not found"
            })
        }

        const newStub = {
            id: uuidv4(),
            sessionId,
            name,
            description,
            fileId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await db.update(data => {
            data.stubs.push(newStub);

            const session = data.sessions.find(s => s.id === sessionId);
            if (session) {
                session.stubsIds.push(newStub.id);
                session.updatedAt = new Date();
            }
        });

        res.status(201).json(newStub);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const stubs = db.data.stubs;
        res.status(200).json(stubs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const stub = db.data.stubs.find(s => s.id === req.params.id);
        res.status(200).json(stub)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
export default router;
