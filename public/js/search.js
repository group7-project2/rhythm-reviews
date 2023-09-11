
// const form = document.getElementById('search-form');

// form.addEventListener('submit', async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior
    
//     const formData = new FormData(form);

//     try {
//         const response = await fetch(`${form.action}?artistName=${encodeURIComponent(formData.get("artistName"))}`, {
//             method: 'GET'
//         });

//         if (response.ok) {
//             const responseData = await response.text();
//             //TODO: display search results in handlebars
//             console.log(responseData)
//         }
//     } catch (error) {
//         console.log(error.message)
//     }
// });

//function for choosing album

