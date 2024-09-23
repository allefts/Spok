import { Hono } from "hono";
import {
  createUser,
  getUserByEmail,
  userAlreadyExists,
} from "../controllers/auth.ts";
import type { APIResponse, RegisterUser } from "../types.ts";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import {
  createJWT,
  getUserFromCookie,
  userSignedIn,
  verifyPassword,
} from "../utils/auth.ts";
import { protect } from "../utils/middleware.ts";
import { HTTPException } from "hono/http-exception";

/*
  GET /USER -> Returns current user if signed in
  POST /SIGNIN -> User login form submission
  POST /REGISTER -> User register form submission
  GET /SIGNIN -> User login form
  GET /REGISTER -> User register form
  POST /LOGOUT -> Logs user out
*/

const authRoutes = new Hono();
authRoutes.get("/user", protect, async (c) => {
  return await getUserFromCookie(c);
});

authRoutes.post("/signin", async (c) => {
  const formData = await c.req.formData();
  //Check if valid data
  if (!formData.has("email") || !formData.has("password")) {
    throw new HTTPException(401, { message: "Invalid Form Data" });
  }

  const tempUser = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  //Check if user exists
  const inDB = userAlreadyExists(tempUser.email, "");
  if (!inDB) {
    throw new HTTPException(401, { message: "Invalid credentials" });
  }

  //Get user
  const user = getUserByEmail(tempUser.email);

  //Verify password
  const isVerif = await verifyPassword(tempUser.password, tempUser.email);
  if (!isVerif) {
    throw new HTTPException(401, { message: "Invalid credentials" });
  }

  const token = await createJWT(user);
  setCookie(c, "auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "Strict",
    maxAge: 60 * 60 * 24, //1 day
  });

  return c.redirect("/main");
});

authRoutes.post("/register", async (c) => {
  const formData = await c.req.formData();

  //Check if valid data
  if (
    !formData.has("username") ||
    !formData.has("email") ||
    !formData.has("password")
  ) {
    throw new HTTPException(401, { message: "Invalid Form Data" });
  }

  //Creates user object
  const tempUser: RegisterUser = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  //Check if user already in database
  const inDB = userAlreadyExists(tempUser.email, tempUser.username);
  if (inDB) {
    throw new HTTPException(401, { message: "User already exists" });
  }

  //Hash password
  tempUser.password = await Bun.password.hash(tempUser.password);

  //Create user
  createUser(tempUser);

  //Get user
  const user = getUserByEmail(tempUser.email);

  //Create jwt and set cookie
  const token = await createJWT(user);
  setCookie(c, "auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "Strict",
    //1 day
    maxAge: 60 * 60 * 24,
  });

  return c.json({
    data: user,
    success: true,
    message: "User created and signed in",
  } as APIResponse);
});

authRoutes.get("/signin", async (c) => {
  if (await userSignedIn(c)) {
    return c.redirect("/");
  }

  return c.html(`
    <form id="signin_form" hx-post="/signin">
      <label for="email">Email</label>
      <input required class="signin_inpt" type="email" placeholder="brucelee@address.com" name="email" />
      <label for="password">Password</label>
      <input required class="signin_inpt" type="password" minlength="8" placeholder="8+ characters" name="password" />
      <button type="submit">Login</button>
    </form>
  `);
});

authRoutes.get("/register", async (c) => {
  if (await userSignedIn(c)) {
    return c.redirect("/");
  }

  return c.html(`
    <form id="register_form">
        <label for="username">Username</label>
        <input
          required
          class="register_inpt"
          type="text"
          placeholder="bruceleefan52"
          name="username"
        />
        <label for="email">Email</label>
        <input
          required
          class="register_inpt"
          type="email"
          placeholder="brucelee@address.com"
          name="email"
        />
        <label for="password">Password</label>
        <input
          required
          class="register_inpt"
          type="password"
          minlength="8"
          placeholder="8+ characters"
          name="password"
        />
        <button type="submit">Register</button>
    </form>
  `);
});

authRoutes.post("/logout", protect, async (c) => {
  const cookie = deleteCookie(c, "auth", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "Strict",
    maxAge: 60 * 60 * 24,
  });

  if (cookie) {
    return c.html("User logged out");
  } else {
    throw new HTTPException(401, { message: "No user to logout" });
  }
});

export default authRoutes;
