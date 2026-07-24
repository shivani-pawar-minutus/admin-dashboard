export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

export function generateFakeToken(
  userId: number
): string {
  const now = Math.floor(Date.now() / 1000);

  const payload: JwtPayload = {
    sub: String(userId),
    iat: now,
    exp: now + 60 * 60 * 24,
    iss: "admin-dashboard",
    aud: "admin-users",
  };

  return btoa(JSON.stringify(payload));
}

export function verifyFakeToken(
  token: string
): JwtPayload | null {
  try {
    const payload: JwtPayload = JSON.parse(
      atob(token)
    );

    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}