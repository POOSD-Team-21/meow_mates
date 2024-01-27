const signUpForm = document.querySelector('#sign-up-form');

signUpForm.addEventListener('submit', async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Grab field values from the form
  const user = Object.fromEntries(new FormData(signUpForm));

  const data = await signUpUser(user);
  if (data.error) {
    console.log(data.error);
    return;
  }

  // Redirect to login page
  window.location.href = '/sign-in.html';
});

// TODO: implement
async function signUpUser(user) {
  const res = await fetch('/api/sign-up.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
}
