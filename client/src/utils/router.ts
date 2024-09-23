export const Router = {
  //Handle <a> clicks to navigate
  setupLinks: function () {
    const navLinks = document.querySelectorAll(".nav_link");
    navLinks.forEach((navLink) => {
      navLink.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const section = "#" + (e.target! as HTMLElement).dataset["section"];
        if (section !== location.hash) {
          Router.navigateTo(section);
        }
      });
    });
  },

  //Handles url hash change, prev and next routing for browser
  setupHashChangePrevNext: function () {
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    function handleHashChange() {
      Router.loadContent(location.hash);
    }
  },

  //Navigates to next page, does not toggle refresh
  navigateTo: function (section: string, replace = false) {
    if (replace) {
      history.replaceState(null, "", section);
    } else {
      history.pushState(null, "", section);
    }
    Router.loadContent(section);
  },
  //Loads new page
  loadContent: async function (section: string) {
    switch (section) {
      case "#signin":
        const { SignInComponent } = await import("../components/SignIn.ts");
        SignInComponent.init();
        break;
      case "#play":
        const { PlayComponent } = await import("../components/Play.ts");
        PlayComponent.init();
        break;
      case "#missions":
        const { MissionsComponent } = await import("../components/Missions.ts");
        MissionsComponent.init();
        break;
      case "#inventory":
        const { InventoryComponent } = await import("../components/Inventory.ts");
        InventoryComponent.init();
        break;
      default:
        break;
    }
  },
};
