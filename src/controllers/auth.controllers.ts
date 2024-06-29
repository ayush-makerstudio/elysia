import { Effect } from "effect";
import passport from "passport";

import { type redirect as redirectType } from "elysia";
import { getGoogleConsentUrl } from "../config/google.config";

export async function authGoogle({ redirect }: { redirect: redirectType }) {
  console.log("Auth Google");
  const url = getGoogleConsentUrl();
  console.log(url);
  return redirect(url);
}

export async function googleCallback() {}
