export function isUnauthorizedError(error: Error): boolean {
  return /^401: .*Unauthorized/.test(error.message);
}

export function isUsageLimitError(error: Error): boolean {
  return /^403: .*limit/.test(error.message) || error.message.includes('requiresAuth');
}