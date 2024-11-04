import "@picocss/pico";
import { Router } from "./utils/router.ts";
import { SignedInLinks, SignedOutLinks } from "./components/Nav.ts";

document.addEventListener("DOMContentLoaded", async () => {
  // const mainContent = document.getElementById("content");
  // const navBar = document.querySelector("nav");

  Router.setupHashChangePrevNext();

  const isThereUser = await fetch("/api/user");
  if (isThereUser.status !== 200) {
    //No one logged in
    Router.userSignedIn = false;
    SignedOutLinks.init();
    Router.navigateTo("#");
  } else {
    //Someone logged in
    Router.userSignedIn = true;
    SignedInLinks.init();
    Router.navigateTo("#main");
  }

  // Router.setupLinks();
});
