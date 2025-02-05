import { JSONFilePreset } from 'lowdb/node';

/**
 * @typedef {Object} Stub
 * @property {string} id UUID
 * @property {string} handlerId ID связанного хендлера
 * @property {string} title Название стаба
 * @property {string} [description] Описание стаба
 * @property {string} fileId Уникальное имя файла
 * @property {Date} createdAt Дата создания
 * @property {Date} updatedAt Дата обновления
 */

/**
 * @typedef {Object} Handler
 * @property {string} id UUID
 * @property {string} sessionId ID сессии
 * @property {boolean} isProxy проксируется ли метод
 * @property {string} [stubId] ID стаба
 */

/**
 * @typedef {Object} Session
 * @property {string} id UUID
 * @property {string} title Название сессии
 * @property {string} backendUrl URL целевого бэкенда
 * @property {Date} createdAt Дата создания
 * @property {Date} updatedAt Дата обновления
 * @property {Array<string>} handlersIds Массив ID хендлеров
 */

/**
 * @typedef {Object} Metadata
 * @property {string|null} currentSessionId ID текущей активной сессии
 */

/**
 * @typedef {Object} Database
 * @property {Array<Session>} sessions Сессии
 * @property {Array<Stub>} stubs Стабы
 * @property {Array<Handler>} handlers Хендлеры
 * @property {Metadata} metadata Метаданные
 */

export const db = await JSONFilePreset('./data/db.json', {
    stubs: [],
    sessions: [],
    handlers: [],
    metadata: {
        currentSessionId: null,
    }
});
