import "@picocss/pico";
import { Router } from "./utils/router.ts";

document.addEventListener("DOMContentLoaded", async () => {
  // const mainContent = document.getElementById("content");
  const navBar = document.querySelector("nav");

  // let user;
  Router.setupHashChangePrevNext();

  const isThereUser = await fetch("http://localhost:4000/user");
  if (isThereUser.status !== 200) {
    //No one logged in
    Router.navigateTo("#signin");
    Router.userSignedIn = false;
  } else {
    //Someone logged in
    // user = await isThereUser.json();
    Router.userSignedIn = true;
    Router.navigateTo("#main");
    navBar!.innerHTML += `<a href="#" class="nav_link" data-section="logs">Logs</a>`;
  }

  Router.setupLinks();
});
