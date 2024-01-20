const signUpForm = document.querySelector('#sign-up-form');

signUpForm.addEventListener('submit', async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Grab field values from the form
  const user = Object.fromEntries(new FormData(signUpForm));
  console.log(user);

  try {
    // Attempt to sign up the user
    await signUpUser(user);

    // Redirect to the dashboard
    window.location.href = '/dashboard';
  } catch (error) {
    // TODO: notify user of error
  }
});

// TODO: implement
async function signUpUser(user) {
  throw new Error('Not implemented');
}
