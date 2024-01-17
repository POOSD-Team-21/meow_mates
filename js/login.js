const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = Object.fromEntries(new FormData(loginForm));
  try {
    await loginUser(user);

    window.location.href = "/dashboard";
  } catch (error) {
    // TODO: notify user of error
  }
});

// TODO: implement loginUser function
async function loginUser(user) {
  throw new Error("Not implemented");
}
