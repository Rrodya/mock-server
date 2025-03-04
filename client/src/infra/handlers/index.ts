import type {CreateHandlerPayload, HandlerService} from "@/infra/handlers/types.ts";

export const handlers: HandlerService = {
  createHandler: (payload: CreateHandlerPayload) => {
    return new Promise((resolve, reject) => {
      resolve('createSession');
    })
  },
  getAllHandlers: () => {
    return new Promise((resolve, reject) => {
      resolve('createSession');
    })
  },
  getHandler: (id: string) => {
    return new Promise((resolve, reject) => {
      resolve('createSession');
    })
  },
  deleteHandler: (id: string) => {
    return new Promise((resolve, reject) => {
      resolve('deleteSession');
    })
  },
  putHandler: (payload: {isProxy?: string, fileId?: string}) => {
    return new Promise((resolve, reject) => {
      resolve('putSession');
    })
  }
}
