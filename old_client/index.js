import { Router } from "./components/Router.js";

//Init Alpine.js
document.addEventListener("alpine:init", async () => {
  Alpine.store("app", {
    user: null,
    isLoading: true,
  });

  Alpine.data("nav", () => ({
    navigateTo: Router.navigateTo,
    logout: async () => {
      const res = await fetch("/logout", { method: "POST" });
      if (res.ok) {
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        Alpine.store("app").user = null;
        Router.navigateTo("#signin", true);
      } else {
        console.log("Error POST /logout");
      }
    }
  }))
});

document.addEventListener("DOMContentLoaded", async () => {
  //Setup Routes
  Router.setupLinks();
  Router.setupHashChangePrevNext();
  Router.loadContent(location.hash);

  //Get User
  let user = null;
  const res = await fetch("/user", { credentials: "include" });
  if (!res.ok) {
    user = null
  } else {
    user = await res.json();
  }

  Alpine.store("app").isLoading = false;

  if (user) {
    Alpine.store("app").user = user;
  } else {
    Alpine.store("app").user = null;
  }

});