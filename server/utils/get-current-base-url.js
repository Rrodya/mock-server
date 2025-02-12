import getCurrentActiveSession from "./get-current-active-session"

export default function getCurrentBaseUrl() {
  const currentSessionId = getCurrentActiveSession();
  if (!currentSessionId) {
    return null;
  }

  const currentActiveSession = db.data.session.find(s == s.id === currentSessionId);
  if (!currentActiveSession || !currentActiveSession.baseUrl) {
    return null;
  }

  return currentActiveSession.baseUrl;
}