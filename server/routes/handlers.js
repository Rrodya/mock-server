import express from 'express';
import { db } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

/**
 * Создание новой сессии
 * @returns {Handler}
 */
router.post('/', async (req, res) => {
    try {
        const { sessionId, isProxy, methodName, stubId } = req.body;

        if (!sessionId || !methodName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const session = db.data.sessions.find(s => s.id === sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const methodExists = db.data.handlers.find(s => s.methodName === methodName);
        if (methodExists) {
            return res.status(400).json({ error: 'Method already exists' });
        }

        if (stubId) {
            const stubExists = db.data.stubs.some(s => s.id === stubId);
            if (!stubExists) {
                return res.status(404).json({ error: 'Stub not found' });
            }

        }

        const newHandler = {
            id: uuidv4(),
            sessionId,
            isProxy: !!stubId,
            methodName,
            stubId: stubId ?? null,
        };


        await db.update(data => {
            data.handlers.push(newHandler);
            const session = data.sessions.find(s => s.id === sessionId);
            session.handlersIds.push(newHandler.id);
        });

        res.status(201).json(newHandler);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { stubId, isProxy } = req.body;

        if (!stubId && !isProxy) {
            return res.status(400).json({ error: 'Missing required fields { stubId } || { isProxy }' });
        }

        await db.update(data => {
            const handler = data.handlers.find(h => h.id === req.params.id);
            if (!handler) {
                return res.status(404).json({ error: 'Handler not found' });
            }

            if (stubId) {
                const stubExists = data.stubs.some(s => s.id === stubId);
                if (!stubExists) {
                    return res.status(404).json({ error: 'Stub not found' });
                }
                handler.isProxy = true;
            }

            if (isProxy !== undefined) {
                if (isProxy) {
                    handler.isProxy = true;
                }

                if (!isProxy) {
                    const stubExists = db.data.stubs.some(s => s.id === stubId);
                    if (!stubExists) {
                        return res.status(400).json({ error: 'For disable proxy handler should have a stub' });
                    }
                    handler.isProxy = true;
                }
            }

            handler.stubId = stubId;

            handler.updatedAt = new Date();
        });

        res.status(200).json(db.data.handlers.find(h => h.id === req.params.id));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
