import { UserIdKey } from "./constants";

export function getUserId() {
  return localStorage.getItem(UserIdKey);
}

export function storeUserId(id: string) {
  localStorage.setItem(UserIdKey, id);
}

export function removeUserId() {
  localStorage.removeItem(UserIdKey);
}
