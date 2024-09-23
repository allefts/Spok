export const fetchUser = async () => {
  const res = await fetch("http://localhost:4000/user", { credentials: "include" });
  if (res.ok) {
    return await res.json();
  } else {
    console.log("Error GET /user");
    return null;
  }
};
