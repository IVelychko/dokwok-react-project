import { AccessTokenKey } from "./constants";

export function getAccessToken() {
  return localStorage.getItem(AccessTokenKey);
}

export function storeAccessToken(token: string) {
  localStorage.setItem(AccessTokenKey, token);
}

export function removeSecurityToken() {
  localStorage.removeItem(AccessTokenKey);
}
