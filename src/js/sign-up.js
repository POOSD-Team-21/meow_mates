// Get the user from local storage
const user = JSON.parse(localStorage.getItem('user'));

// If user is already logged in, redirect to dashboard
if (user) {
  window.location.href = '/dashboard';
}

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

// when loading page, need to check if length is less then 767 pixels
// if so, then we need to add a button to get back to home
window.onload = function() {
  const homeLink = document.querySelector('#homeLink')
  // checks if window size is less then 767 pixels
  if (window.innerWidth <= 767) {
    homeLink.style.display = 'block';
  } else {
    // otherwise hides it
    homeLink.style.display = 'none';
  }
}

// when resizing we do the same thing in case it is resized to less then 767
window.addEventListener('resize', function() {
  const homeLink = document.querySelector('#homeLink')
  // checks if window size is less then 767 pixels
  if (window.innerWidth <= 767) {
    homeLink.style.display = 'block';
  } else {
    // otherwise hides it
    homeLink.style.display = 'none';
  }
});
