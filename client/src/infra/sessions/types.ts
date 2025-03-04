export type CreateSessionPayload = {
  title: string,
  baseUrl: string
}

export type Session = {
  id: string,
  title: string,
  baseUrl: string,
}

export type SessionService = {
  getAllSessions: () => Promise<any>,
  getSession: (id: string) => Promise<any>,
  createSession: (payload: CreateSessionPayload) => Promise<any>,
  deleteSession: (id: string) => Promise<void>,
  getActiveSession: () => Promise<any>,
  setActiveSession: (id: string) => Promise<any>,
}
