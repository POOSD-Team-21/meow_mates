// gets user to see if we are logged in
const user = JSON.parse(localStorage.getItem('user'));

// sets ids for for the HTML elements
const signInLink = document.querySelector('#sign-in-link');
const signOutButton = document.querySelector('#sign-out-button');
const signUpButton = document.querySelector('#sign-up-button');
const dashboard = document.querySelector('#dashboard-button');

// Edits customization for when user is logged in or not
if (user) {
  // swaps sign in button with sign out button
  signInLink.style.display = 'none';
  signOutButton.style.display = 'block';

  // hides the sign up button on main page
  signUpButton.style.display = 'none';
} else {
  // user is not logged in, so we show the sign-in button
  signInLink.style.display = 'block';
  signOutButton.style.display = 'none';

  // shows the sign up button on main page
  signUpButton.style.display = 'block';
}

// signs user out
signOutButton.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = '/sign-in.html';
});

// adds logic for dashboard button
dashboard.addEventListener('click', () => {
  // if logged in, we go to dashboard
  if (user) {
    window.location.href = '/dashboard';
  }
  // otherwise takes to sign-in page as they are not logged in
  else {
    window.location.href = '/sign-in';
  }
});
