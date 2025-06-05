import { UserIdKey } from "./constants";

export function getUserId() {
  const userId = localStorage.getItem(UserIdKey);
  return userId !== null ? parseInt(userId) : null;
}

export function storeUserId(id: number) {
  localStorage.setItem(UserIdKey, id.toString());
}

export function removeUserId() {
  localStorage.removeItem(UserIdKey);
}
