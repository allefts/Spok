import { showToast } from "../utils/toast";

export const MainComponent = {
  init: async () => {
    const html = await fetch("http://localhost:4000/main");
    document.getElementById("content")!.innerHTML = await html.text();

    const actions = document.querySelector(".actions")!;
    actions.addEventListener("click", async (e: Event) => {
      const target: HTMLElement | null = (e.target! as HTMLElement).closest(
        "[data-action]"
      );

      if (target) {
        const action = target.dataset.action;
        const res = await fetch("http://localhost:4000/main", {
          method: "POST",
          body: action,
        });

        if (res.status !== 200) {
          showToast("Unable to complete action");
        }
      }
    });
  },
};
