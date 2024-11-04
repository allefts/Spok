import { Router } from "../utils/router";
import { showToast } from "../utils/toast";
import { SignedInLinks } from "./Nav";

export const RegisterComponent = {
  init: async () => {
    const html = await (await fetch("/api/register")).text();
    const content = document.getElementById("content");
    content!.innerHTML = html;

    const signInForm = document.getElementById("register_form");
    signInForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          body: new FormData(signInForm as HTMLFormElement),
        });

        if (res.status !== 200) {
          showToast((await res.json()).message);
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
