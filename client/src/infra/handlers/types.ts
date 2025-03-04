export type CreateHandlerPayload = {
  sessionId: string,
  methodName: string,
}

export type Handler = {
  id: string,
  sessionId: string,
  methodName: string,
  stubId?: string,
  isProxy?: boolean,
}

export type HandlerService = {
  getAllHandlers: () => Promise<Handler[]>,
  getHandler: (id: string) => Promise<Handler>,
  createHandler: (payload: CreateHandlerPayload) => Promise<Handler>,
  deleteHandler: (id: string) => Promise<void>,
  putHandler: (id: string) => Promise<void>,
}
