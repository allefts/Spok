const spanToast = document.getElementById("toast");
export const showToast = (message: string) => {
  spanToast!.innerText = `⚠️ ${message}`;
  spanToast!.classList.add("show");

  setTimeout(() => {
    spanToast!.classList.remove("show");
    spanToast!.innerText = "";
  }, 3000);
};
