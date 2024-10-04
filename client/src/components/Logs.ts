export const LogsComponent = {
  init: async () => {
    const html = await fetch("http://localhost:4000/logs");
    document.getElementById("content")!.innerHTML = await html.text();
  },
};
