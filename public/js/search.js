// const searchForm = document.getElementById('search-form');
//   const artistNameInput = document.getElementById('search-input');
// //   const errorMessage = document.getElementById('error-message');
// //   const resultsDiv = document.getElementById('results');

//   searchForm.addEventListener('submit', async (event) => {
//     try {
//         // event.preventDefault();
//         // console.log(artistNameInput)
//       fetch(`/api/artist-search?artistName=${encodeURIComponent(artistNameInput.textContent)}`)
//       .then(async (response) => {
//        if (response.status !== 200) {
//         event.preventDefault();
//         console.log('prevented', response);
//        } else {
//         console.log("good")
//        }

//         // const data = await response.json();
//       })
//       .catch((error) => {
//         event.preventDefault();
//         console.log('prevented', error);
//       });
//       // Handle and render the results here
//     //   res.render('results', {albums: albums.album});
//       // Update the resultsDiv with the fetched data
//     } catch (error) {
//         event.preventDefault();
//         // console.log('prevented', error);
//     }
//   })
    
//     const artistName = artistNameInput.value;
    
//     // Clear previous error messages
//     errorMessage.textContent = '';

//     // Check if artistName is empty
//     if (!artistName || artistName.trim() === '') {
//       errorMessage.textContent = 'Please enter a valid artist name.';
//       return;
//     }

//     try {
//       const response = await fetch(`/api/artist-search?artistName=${encodeURIComponent(artistName)}`);
//       const data = await response.json();
//       // Handle and render the results here
//     //   res.render('results', {albums: albums.album});
//       // Update the resultsDiv with the fetched data
//     } catch (error) {
//       errorMessage.textContent = 'An error occurred while fetching data.';
//     }
//   });

// async function albumReview (albumId) {
//     try {
//         const response = await fetch(`/api/reviews/album/${encodeURIComponent(albumId)}`);
              
//     } catch (error) {
//       errorMessage.textContent = 'An error occurred while fetching data.';
//     }
// }