import { updateGlobalUI } from "./Global.js";
import { Router } from "./Router.js";

export const RegisterComponent = {
    init: async () => {
        const res = await fetch("/register", { method: "GET" });
        if (res.ok) {
            const html = await res.text();
            document.getElementById("main_content").innerHTML = html;
            RegisterComponent.load();
        } else {
            console.log("Error GET /register");
        }
    },
    load: () => {
        document.getElementById("register_form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const res = await fetch("/register", { method: "POST", body: formData });
            if (res.ok) {
                Router.navigateTo("#main", true);
            } else {
                console.log("Error POST /register");
            }
        })
    }
}