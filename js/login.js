const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Grab field values from the form
  const user = Object.fromEntries(new FormData(loginForm));
  try {
    // Attempt to login the user
    await loginUser(user);

    // Redirect to the dashboard
    window.location.href = '/dashboard';
  } catch (error) {
    // TODO: notify user of error
  }
});

// TODO: implement loginUser function
async function loginUser(user) {
  throw new Error('Not implemented');
}
