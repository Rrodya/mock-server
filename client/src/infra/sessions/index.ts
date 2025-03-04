import type {CreateSessionPayload, SessionService} from "@/infra/sessions/types.ts";

const mockSession = {
    "id": "27d625ff-6cf4-44e4-a774-5a30aab2f510",
    "title": "session2",
    "createdAt": "2025-02-09T19:03:40.942Z",
    "updatedAt": "2025-02-09T19:03:40.942Z",
    "baseUrl": "http://localhost:3001",
    "handlersIds": [
      "5f4b2f8a-44c3-41c6-8814-b52eb4a0a96f"
    ]
};

const mockSession2 = {
  "id": "27d625ff-6324-44e4-a774-5a30aab2f510",
    "title": "Here is session for another",
    "createdAt": "2025-02-09T19:03:40.942Z",
    "updatedAt": "2025-02-09T19:03:40.942Z",
    "baseUrl": "http://example-link/",
    "handlersIds": [
    "5f4b2f8a-44c3-41c6-8814-b52eb4a0a96f"
  ]
}

export const sessions: SessionService = {
  createSession: (payload: CreateSessionPayload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      resolve(mockSession);
    })
  },
  getAllSessions: () => {
    return new Promise((resolve, reject) => {
      resolve([mockSession, mockSession2]);
    })
  },
  getSession: (id: string) => {
    return new Promise((resolve, reject) => {
      resolve(mockSession);
    })
  },
  deleteSession: (id: string) => {
    return new Promise((resolve, reject) => {
      resolve('deleteSession');
    })
  },
  getActiveSession: () => {
    return new Promise((resolve, reject) => {
      resolve({activeSession: mockSession.id});
    })
  },
  setActiveSession: (id: string) => {
    return new Promise((resolve, reject) => {
      resolve({activeSession: mockSession2.id})
    })
  }
}
