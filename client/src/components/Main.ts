import { showToast } from "../utils/toast";

export const MainComponent = {
  init: async function () {
    //Main HTMl
    const html = await fetch("/api/main");
    document.getElementById("content")!.innerHTML = await html.text();

    //Elements
    const mainContent = document.querySelector(".main_content")!;
    const sidebarContent = mainContent.querySelector(".sidebar_contents");
    const actionInput = mainContent.querySelector(
      ".action_input"
    )! as HTMLInputElement;
    const currEmoji = mainContent.querySelector(
      ".random_emoji_btn"
    )! as HTMLButtonElement;
    const actions = mainContent.querySelector(".actions")!;

    //Clicking an action card
    actions.addEventListener("click", async (e: Event) => {
      const target: HTMLElement | null = (e.target! as HTMLElement).closest(
        "div"
      );

      if (target) {
        const icon = target.querySelector("h3")!.textContent ?? "🪐";
        const name = target.querySelector("h5")!.textContent ?? "Nothing";
        actionInput.value = name;
        currEmoji.textContent = icon;
        // await this.postAction(icon, name);
      }
    });

    //Submitting through input
    actionInput.addEventListener("keydown", async (e: Event) => {
      //Get Input Value
      const inputValue = actionInput.value;
      if (!inputValue) {
        return;
      }

      if ((e as KeyboardEvent).key === "Enter") {
        //Post Action
        const success = await this.postAction(currEmoji.innerText, inputValue);
        if (success) {
          //Reset Input
          actionInput.value = "";
          currEmoji.innerText = "🤗";

          //Updates Sidebar
          const mostRecentLog = await fetch("/api/recentlog");
          sidebarContent!.insertAdjacentHTML(
            "beforeend",
            await mostRecentLog.text()
          );
          sidebarContent!.querySelector(".no_logs_message")?.remove();
        }
      }
    });

    //Today's logs for sidebar
    const todaysLogs = await fetch("/api/sidebarlogs");
    sidebarContent!.innerHTML = await todaysLogs.text();
  },

  postAction: async function (icon: string, name: string) {
    const res = await fetch("/api/main", {
      method: "POST",
      body: icon + " " + name,
    });

    if (res.status !== 200) {
      showToast("Unable to complete action");
      return false;
    }

    return true;
  },
};
