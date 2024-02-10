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

// when loading page, need to check if length is less then 767 pixels
// if so, then we need to add a button to get back to home
window.onload = function () {
  const homeLink = document.querySelector('#homeLink');
  // checks if window size is less then 767 pixels
  if (window.innerWidth <= 767) {
    homeLink.style.display = 'block';
  } else {
    // otherwise hides it
    homeLink.style.display = 'none';
  }
};

// when resizing we do the same thing in case it is resized to less then 767
window.addEventListener('resize', function () {
  const homeLink = document.querySelector('#homeLink');
  // checks if window size is less then 767 pixels
  if (window.innerWidth <= 767) {
    homeLink.style.display = 'block';
  } else {
    // otherwise hides it
    homeLink.style.display = 'none';
  }
});
