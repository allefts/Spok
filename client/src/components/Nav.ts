import { Router } from "../utils/router";

export const SignedOutLinks = {
  init: () => {
    let navBar = document.querySelector("nav")!;
    navBar.querySelector(".signedin_links")?.remove();
  },
};

export const SignedInLinks = {
  init: () => {
    let navBar = document.querySelector("nav")!;
    navBar!.innerHTML += `
        <div class="signedin_links">
            <a href="#logs" class="nav_link" data-tooltip="Logs" data-placement="bottom">🪵</a>
            <a class="signout_link nav_link" data-tooltip="Sign Out" data-placement="bottom">🚪</a>
        </div>
        `;
    const signOutLink = navBar!.querySelector(".signout_link");
    signOutLink!.addEventListener("click", async (e) => {
      e.preventDefault();
      await fetch("/api/logout", { method: "POST" });
      Router.userSignedIn = false;
      SignedOutLinks.init();
      Router.navigateTo("#");
    });
  },
};
