//Login
async function loginFormHandler(event) {
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        
        const errorMessage = document.querySelector('#api-message')
        const responseJson = await response.json()
        errorMessage.textContent = responseJson.message
        errorMessage.classList.remove('hidden')
      }
    }
  };
  
  