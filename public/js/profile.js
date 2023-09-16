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
    console.log(id)
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