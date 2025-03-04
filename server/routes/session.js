import express from 'express';
import { db } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

/**
 * Создание новой сессии
 * @returns {Session}
 */

router.post('/', async (req, res) => {
    try {
        const { title, baseUrl } = req.body;
        if (!title || !baseUrl) {
            return res.status(400).json({ error: 'Missing required fields {title, baseUrl}' });
        }
        const newSession = {
            id: uuidv4(),
            title: title,
            createdAt: new Date(),
            updatedAt: new Date(),
            baseUrl: baseUrl,
            handlersIds: []
        };

        await db.update(data => data.sessions.push(newSession));
        res.status(201).json(newSession);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const sessions = db.data.sessions;
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).send(`<div>Error: ${error.message}</div>`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const session = await db.data.sessions.find(s => s.id === req.params.id);
        if (!session) {
            return res.status(404).json({ error: 'session not found' });
        }
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await db.update(data => {
            data.sessions = data.sessions.filter(s => s.id !== req.params.id);
            data.handler = data.handlers.filter(s => s.sessionId !== req.params.id);
        });
        res.status(200).json({ message: 'session deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

/**
 * Обновление полей сессии
 * @param {string} [title] Новый заголовок сессии
 * @param {string} [baseUrl] Новый URL бэкенда
 * @returns {Session} Обновленная сессия
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, baseUrl } = req.body;

        if (!title && !baseUrl) {
            return res.status(400).json({ error: 'Nothing to update' });
        }

        if (title && typeof title !== 'string') {
            return res.status(400).json({ error: 'Invalid title format' });
        }

        let updatedSession;

        await db.update(data => {
            const sessionIndex = data.sessions.findIndex(s => s.id === id);

            if (sessionIndex === -1) {
                return res.status(404).json({ error: 'Session not found' });
            }

            updatedSession = data.sessions[sessionIndex];

            if (title) updatedSession.title = title;
            if (baseUrl) updatedSession.baseUrl = baseUrl;

            updatedSession.updatedAt = new Date();

            data.sessions[sessionIndex] = updatedSession;
        });

        res.status(200).json(updatedSession);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/active-session', async (req, res) => {
    try {
       const activeSession = db.data.metadata.currentSessionId;

       if (!activeSession) {
           res.status(404).json({ error: 'No active session' });
       }
       res.status(200).json({activeSession: activeSession});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/active-session/:id', async (req, res) => {
   try {
       const { id } = req.params;
       const activeSession = db.data.sessions.find(s => s.id === id);
       if (!activeSession) {
          res.status(404).json({ error: 'No active session' });
       }
       await db.update(data => {
           data.metadata.currentSessionId = id;
       })
       res.status(500).json({currentSession: id});
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
})

export default router;
