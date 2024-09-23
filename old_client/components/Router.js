export const Router = {
    //Handle <a> clicks to navigate
    setupLinks: function () {
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((navLink) => {
            navLink.addEventListener("click", (e) => {
                e.preventDefault();
                const section = "#" + e.target.dataset["section"];
                if (section !== location.hash) {
                    navigateTo(section);
                }
            })
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
    navigateTo: function (section, replace = false) {
        if (replace) {
            history.replaceState(null, "", section)
        } else {
            history.pushState(null, "", section);
        }
        Router.loadContent(section);
    },
    //Loads new page
    loadContent: async function (section) {
        switch (section) {
            case "#signin":
                const { SignInComponent } = await import("./SignIn.js");
                SignInComponent.init();
                break;
            case "#register":
                const { RegisterComponent } = await import("./Register.js");
                RegisterComponent.init();
                break;
            case "#main":
                const { MainComponent } = await import("./Main.js");
                MainComponent.init();
                break;
            default:
                const { HomeComponent } = await import("./Home.js");
                HomeComponent.init();
                break;
        }
    }
}