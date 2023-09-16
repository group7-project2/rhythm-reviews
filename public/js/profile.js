// document.addEventListener('DOMContentLoaded', () => {
//     const profileLink = document.getElementById('profile-link');
//     const updateButton = document.getElementById('update-review');

//     if (profileLink) {
//       profileLink.addEventListener('click', (event) => {
//         event.preventDefault(); 
//         window.location.href = '/profile';
//       });
//     }
// 
//   });

  function showUpdateFields(event, id) {
      const formDiv = document.getElementById(`update-review-form-${id}`)
      formDiv.classList.remove('hidden')
      event.target.classList.add('hidden')
  }

  function cancelUpdateReview(id) {
    const formDiv = document.getElementById(`update-review-form-${id}`)
    const updateButton = document.getElementById(`update-review-${id}`)
      formDiv.classList.add('hidden')
      updateButton.classList.remove('hidden')
  }

  async function saveUpdatedReview(id) {
    const title = document.getElementById(`review-title-${id}`).value.trim();
    const content = document.getElementById(`review-content-${id}`).value.trim();
    const response = await fetch('/api/reviews/update', {
      method: 'PUT',
      body: JSON.stringify({ id, title, content}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to save review');
    }
  }