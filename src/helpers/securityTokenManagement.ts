export function getSecurityToken() {
  return localStorage.getItem("securityToken");
}

export function storeSecurityToken(token: string) {
  localStorage.setItem("securityToken", token);
}

export function removeSecurityToken() {
  localStorage.removeItem("securityToken");
}
