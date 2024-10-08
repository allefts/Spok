export const LandingComponent = {
  init: async function () {
    const content = document.getElementById("content");
    content!.innerHTML = `
    <div class="landing_header">
        <h1 class="landing_header_title"> <span class="float">💥</span> Celebrate Today’s Triumphs! <span class="float">💥</span> </h1>
        <p class="landing_header_description">Instead of stressing about what's left, celebrate what's done.</p>
        <div class="landing_controls">
            <a href="#signin" class="landing_signin_link nav_link"><button class="signin_btn">Sign In</button></a>
            <a href="#register" class="landing_signin_link nav_link"><button class="register_btn">Register</button></a>
        </div>
    </div>
    <div class="landing_demo">
    
    </div>
    `;
  },
};
