document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.getElementById('profile-link');
  
    if (profileLink) {
      profileLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        window.location.href = '/profile';
      });
    }
  });