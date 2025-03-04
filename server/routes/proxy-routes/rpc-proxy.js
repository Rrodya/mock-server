import express from 'express'
import * as fs from 'node:fs'
import path from 'node:path'
import { db } from '../../db/db'
import getCurrentActiveSession from '../../utils/get-current-active-session'
import getCurrentBaseUrl from '../../utils/get-current-base-url'

const router = express.Router()

const STUBS_DIR = path.resolve(__dirname, '../mocks')

router.post('/rps', async (req, res, next) => {
	try {
		const rpcRequestBody = req.body

		const { method } = rpcRequestBody

		const activeSessionId = getCurrentActiveSession()
		const currentMethod = db.data.handlers.find(
			h => h.sessionId === activeSessionId && h.methodName === method
		)

		/**
		 * Проксируем запрос только в том случае если вызыванный метод не найден ИЛИ в найденном
		 * хендлере явно указано проксироание ИЛИ к хендлеру не привязана стабовая заглушка
		 */
		if (!currentMethod || currentMethod.isProxy || !currentMethod.fileId) {
			createProxyMiddleware({
				target: getCurrentBaseUrl(),
				changeOrigin: true,
				logLevel: 'debug',
			})(req, res, next)
			return
		}

		const stubPath = path.join(STUBS_DIR, `${currentMethod.fileId}.json`)

		if (!fs.access(stubPath)) {
			/**
			 * TODO: в этом кейсе когда у нас вроде бы есть файл id, но может быть такое,
			 * что файл попросту напрямую удалили из папки стабов. Нужно как-то бесшовно
			 * пробросить проксирование в текущий запрос ИЛИ можно прям явно указать на ошибку
			 * и вернуть это в тексте ошибки о том что какая-то ошибка проверьте данные стабов
			 * (TODO: здесь зразу же можно запилить фичу обновления данных. Где например при загрузке
			 * данных о хендлерах можно проверять целостны ли файлы и если нет то автоматически
			 * поаставить isProxy и удалить файл id у хендлера, так же можно напомнить пользователю
			 * о том что у не целостные данные)
			 */
			return
		}

		// TODO: в result засунуть сразу rowData, без парсинга
		const rawData = await fs.readFileSync(stubPath, 'utf-8')
		const stubData = JSON.parse(rawData)

		const rpcResponseBody = {
			id: rpcRequestBody.id,
			jsonrpc: '2.0',
			result: stubData,
		}

		rpc.status(200).json(rpcResponseBody)
	} catch (error) {
		res.status(500).json({
			jsonrpc: '2.0',
			id: null,
			error: { code: -32600, message: error.message },
		})
	}
})
