export const LogsComponent = {
  init: async function () {
    const content = document.getElementById("content")!;
    await this.initPage(content);
    //Elements
    const logsContent = document.querySelector(".logs_content");
    const logCards = logsContent?.querySelectorAll(".log_card");

    //Log Card actions
    if (logCards) {
      logCards.forEach((logCard) => {
        const logId = (logCard as HTMLDivElement).dataset.id;
        const deleteBtn = logCard.querySelector(".delete_log_btn");
        deleteBtn?.addEventListener("click", async () => {
          const res = await fetch("/api/log", {
            body: JSON.stringify({ logId }),
            method: "DELETE",
          });

          if (res.status === 200) {
            logCard.remove();
          }

          console.log(await res.text());
        });
      });
    }

    //Yesterday's logs button
    const yesterdayLogsBtn = logsContent?.querySelector(".logs_yesterday");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    yesterdayLogsBtn?.addEventListener("click", async () => {
      const res = await fetch(`/api/logs/${yesterday.toString()}`);

      if (res.status === 200) {
        const data = await res.json();
        content!.innerHTML = data.html;

        const todayBtn = content?.querySelector(".logs_today_btn");
        todayBtn?.addEventListener("click", async () => {
          this.init();
        });
      }
    });
  },
  initPage: async function (content: HTMLElement) {
    //HTML
    const html = await fetch("/api/logs");
    content.innerHTML = await html.text();
    return true;
  },
};
