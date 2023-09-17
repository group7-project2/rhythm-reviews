//New review on album
const reviewHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#review-title').value.trim();
    const content = document.querySelector('#review-content').value.trim();

    const response = await fetch('/api/reviews/create', {
      method: 'POST',
      body: JSON.stringify({title, content, album_id: window.location.pathname.split('/').pop()}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to save review');
    }
  };
  
  document.querySelector('#submit-review').addEventListener('click', reviewHandler);