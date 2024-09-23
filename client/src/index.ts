import "@picocss/pico";
import "htmx.org";
import { Router } from "./utils/router.ts";
import { showToast } from "./utils/toast.ts";

document.addEventListener("DOMContentLoaded", async () => {
  //Error Handling for HTMX
  document.addEventListener("htmx:responseError", (e: any) => {
    const { message } = JSON.parse(e.detail.xhr.responseText);
    showToast(message);
  });

  Router.setupLinks();
  Router.setupHashChangePrevNext();
});
