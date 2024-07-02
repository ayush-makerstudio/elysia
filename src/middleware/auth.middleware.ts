import { WorkOS } from "@workos-inc/node";
import { Cookie, CookieOptions, redirect } from "elysia";
import { sealData, unsealData } from "iron-session";
import { createRemoteJWKSet, jwtVerify } from "jose";

const clientId = process.env.WORKOS_CLIENT_ID as string;
const workos = new WorkOS(clientId);

// Set the JWKS URL. This is used to verify if the JWT is still valid
const JWKS = createRemoteJWKSet(
  new URL(workos.userManagement.getJwksUrl(clientId))
);

export async function authMiddleware({
  cookie,
  redirect,
}: {
  cookie: any;
  redirect: redirect;
}) {
  const session = (await getSessionFromCookie(
    cookie.name.value.encryptedSession
  )) as any;
  console.log(session);

  const hasValidSession = await verifyAccessToken(
    session.accessToken as string
  );
  if (!hasValidSession) {
      return false;

  }
  try {
    const { accessToken, refreshToken } =
      await workos.userManagement.authenticateWithRefreshToken({
        clientId,
        refreshToken: session.refreshToken,
      });
    const encryptedSession = await sealData(
      {
        accessToken,
        refreshToken,
        user: session.user,
        impersonator: session.impersonator,
      },
      { password: process.env.WORKOS_COOKIE_PASSWORD as string }
    );
    console.log(cookie.name.value);
    cookie.name.value.encryptedSession = encryptedSession;
    
    cookie.name.path = "/";
    cookie.name.httpOnly = true;
    cookie.name.secure = true;
    cookie.name.sameSite = "lax";
    
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return redirect("/auth/login");
  }
}

async function getSessionFromCookie(session: any) {
  if (session) {
    const sess = unsealData(session, {
      password: process.env.WORKOS_COOKIE_PASSWORD as string,
    });
    console.log("sess-> ", sess);
    return sess;
  }
}

async function verifyAccessToken(accessToken: string) {
  try {
    await jwtVerify(accessToken, JWKS);
    return true;
  } catch (e) {
    console.warn("Failed to verify session:", e);
    return false;
  }
}
