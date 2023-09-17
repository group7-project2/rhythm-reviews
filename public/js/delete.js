//Delete review
document.addEventListener('DOMContentLoaded', () => {
  const deleteReviewLinks = document.querySelectorAll('.delete-review-link');

  deleteReviewLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const reviewId = link.getAttribute('data-review-id');

      try {
        const response = await fetch(`/api/reviews/${reviewId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const reviewElement = document.querySelector(`[data-review-id="${reviewId}"]`);
          if (reviewElement) {
            reviewElement.remove();
          }
        } else {
          console.error('Review deletion failed.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  });
});


