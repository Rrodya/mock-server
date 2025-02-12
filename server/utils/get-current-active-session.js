import { db } from "../db/db";

export default function getCurrentActiveSession() {
  const metadata = db.data.metadata;
  if (!metadata.currentSessionId) {
    return null;
  }
  return metadata.currentSessionId;
}