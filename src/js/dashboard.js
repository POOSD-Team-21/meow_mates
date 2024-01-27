// Check if the user is logged in
// If not, redirect to the sign in page
// If so, display the dashboard

const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
  window.location.href = '/sign-in.html';
}
