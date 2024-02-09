// Get the user from local storage
const user = JSON.parse(localStorage.getItem('user'));

// If user is already logged in, redirect to dashboard
if (user) {
  window.location.href = '/dashboard';
}

const signInForm = document.querySelector('#sign-in-form');
const loggedInFail = document.querySelector('#incorrect-login-error');

// initially hides error message
loggedInFail.style.display = 'none';

signInForm.addEventListener('submit', async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Grab field values from the form
  const user = Object.fromEntries(new FormData(signInForm));

  const data = await signInUser(user);
  if (data.error) {
    console.log(data.error);
    // shows error message
    loggedInFail.style.display = 'block';
    return;
  }

  localStorage.setItem(
    'user',
    JSON.stringify({
      id: data.id,
    }),
  );

  // Redirect to the home landing page
  window.location.href = '/dashboard';
});

// TODO: implement
async function signInUser(user) {
  const res = await fetch('/api/sign-in.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
}
