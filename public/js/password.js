//New password
const passwordFormHandler = async (event) => {
  event.preventDefault();

  const currentPassword = document.querySelector('#currentPassword').value.trim();
  const newPassword = document.querySelector('#newPassword').value.trim();
  const confirmPassword = document.querySelector('#confirmPassword').value.trim();

  if (newPassword === confirmPassword) {
    const response = await fetch('/api/users/profile/password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/api/users/logout');
      alert('Successfully Updated Password');
    } else {
      alert('Failed to update password');
    }
  }
};

document.querySelector('.password-change-form').addEventListener('submit', passwordFormHandler);