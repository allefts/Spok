import { showToast } from "../utils/toast";

export const MainComponent = {
  init: async function () {
    const html = await fetch("http://localhost:4000/main");
    document.getElementById("content")!.innerHTML = await html.text();

    const mainContent = document.querySelector(".main_content")!;

    const actions = mainContent.querySelector(".actions")!;
    actions.addEventListener("click", async (e: Event) => {
      const target: HTMLElement | null = (e.target! as HTMLElement).closest(
        "div"
      );

      if (target) {
        const icon = target.querySelector("h3")!.textContent ?? "🪐";
        const name = target.querySelector("h5")!.textContent ?? "Nothing";
        await this.postAction(icon, name);
      }
    });

    // const randomEmojis = await (
    //   await fetch("https://emojihub.yurace.pro/api/all/group/face-positive")
    // ).json();

    // const randomEmojiBtn = mainContent.querySelector(".random_emoji_btn")!;
    // randomEmojiBtn.addEventListener("click", async () => {
    //   randomEmojiBtn.innerHTML =
    //     randomEmojis[
    //       Math.floor(Math.random() * randomEmojis.length)
    //     ].htmlCode[0];
    // });

    const actionInput = mainContent.querySelector(
      ".action_input"
    )! as HTMLInputElement;
    const currEmoji = (
      mainContent.querySelector(".random_emoji_btn")! as HTMLButtonElement
    ).innerText;

    actionInput.addEventListener("keydown", async (e: Event) => {
      const inputValue = actionInput.value;
      if (!inputValue) {
        return;
      }

      if ((e as KeyboardEvent).key === "Enter") {
        const success = await this.postAction(currEmoji, inputValue);
        if (success) {
          actionInput.value = "";
        }
      }
    });
  },

  postAction: async function (icon: string, name: string) {
    const res = await fetch("http://localhost:4000/main", {
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
