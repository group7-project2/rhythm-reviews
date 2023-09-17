async function loginFormHandler(event) {
  
    // Collect values from the login form
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
      } else {
        
        const errorMessage = document.querySelector('#api-message')
        const responseJson = await response.json()
        errorMessage.textContent = responseJson.message
        errorMessage.classList.remove('hidden')
      }
    }
  };
  
  