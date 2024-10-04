export const SignInComponent = {
  init: async () => {
    const html = await (await fetch("http://localhost:4000/signin")).text();
    document.getElementById("content")!.innerHTML = html;
  },
};
