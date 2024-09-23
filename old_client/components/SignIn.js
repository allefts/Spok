import { Router } from "./Router.js";

export const SignInComponent = {
    init: async () => {
        const res = await fetch("/signin", { method: "GET" });
        if (res.ok) {
            const html = await res.text();
            document.getElementById("main_content").innerHTML = html;
            SignInComponent.load();
        } else {
            console.log("Error GET /signin")
        }
    },
    load: () => {
        document.getElementById("signin_form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const res = await fetch("/signin", { method: "POST", body: formData });
            if (res.ok) {
                Router.navigateTo("#main", true);
            } else {
                console.log("Error POST /signin");
            }
        });
    }
}