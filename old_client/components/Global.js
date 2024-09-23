// Renders different UI depending on if user is logged in or not
export function updateGlobalUI(user = null) {
    if (user) {
    } else {
    }
}

//LOGOUT 
// document.getElementById("logout_btn").addEventListener("click", async (e) => {
//     const res = await fetch("/logout", { method: "POST" });
//     if (res.ok) {
//         localStorage.removeItem("username");
//         localStorage.removeItem("email");
//         updateGlobalUI();
//         navigateTo("#signin", true);
//     } else {
//         console.log("Error POST /logout");
//     }
// });
