import { Router } from "../utils/router";
import { showToast } from "../utils/toast";
import { SignedInLinks, SignedOutLinks } from "./Nav";

export const SignInComponent = {
  init: async () => {
    const html = await (await fetch("/api/signin")).text();
    const content = document.getElementById("content");
    content!.innerHTML = html;

    const signInForm = document.getElementById("signin_form");
    signInForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("/api/signin", {
          method: "POST",
          body: new FormData(signInForm as HTMLFormElement),
        });

        if (res.status !== 200) {
          showToast((await res.json()).message);
          Router.userSignedIn = false;
          SignedOutLinks.init();
        } else {
          Router.userSignedIn = true;
          SignedInLinks.init();
          Router.navigateTo("#main");
        }
      } catch (err) {
        console.log(err);
        console.log("Could not sign in");
      }
    });
  },
};
