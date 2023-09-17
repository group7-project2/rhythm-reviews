//Update review on profile
function showUpdateFields(event, id) {
  const formDiv = document.getElementById(`update-review-form-${id}`)
  formDiv.classList.remove('hidden')
  event.target.classList.add('hidden')
}
//cancel update
function cancelUpdateReview(id) {
  const formDiv = document.getElementById(`update-review-form-${id}`)
  const updateButton = document.getElementById(`update-review-${id}`)
  formDiv.classList.add('hidden')
  updateButton.classList.remove('hidden')
}
//save update 
async function saveUpdatedReview(id) {
  const title = document.getElementById(`review-title-${id}`).value.trim();
  const content = document.getElementById(`review-content-${id}`).value.trim();
  const response = await fetch('/api/reviews/update', {
    method: 'PUT',
    body: JSON.stringify({ id, title, content }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    location.reload();
  } else {
    alert('Failed to save review');
  }
}