const signInForm = document.querySelector('#sign-in-form');

signInForm.addEventListener('submit', async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Grab field values from the form
  const user = Object.fromEntries(new FormData(signInForm));
  console.log(user);

  try {
    // Attempt to sign in the user
    await signInUser(user);

    // Redirect to the dashboard
    window.location.href = '/dashboard';
  } catch (error) {
    // TODO: notify user of error
  }
});

// TODO: implement
async function signInUser(user) {
  throw new Error('Not implemented');
}
