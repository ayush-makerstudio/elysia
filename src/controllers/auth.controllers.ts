import { Effect } from "effect";
import passport from "passport";



export async function authGoogle() {
      return await passport.authenticate("google", { scope: ["profile", "email"] });
}


export async function googleCallback  () {
      
}

