const user = JSON.parse(localStorage.getItem('user'));

const signInLink = document.querySelector('#sign-in-link');
const signOutButton = document.querySelector('#sign-out-button');

if (user) {
  signInLink.style.display = 'none';
  signOutButton.style.display = 'block';
} else {
  signInLink.style.display = 'block';
  signOutButton.style.display = 'none';
}

signOutButton.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = '/sign-in.html';
});
