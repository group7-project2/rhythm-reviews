require('dotenv').config();

const audioDbRootUrl = 'https://theaudiodb.p.rapidapi.com';
const audioDbOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.AUDIODB_APIKEY,
		'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
	}
};

async function getAlbumsByArtist (artistName) {
    const searchResult = await fetch(`${audioDbRootUrl}/searchalbum.php?s=${artistName}`, audioDbOptions)
  const albums = await searchResult.json()
  return albums;
}

async function getAlbumById (id) {
    const response = await fetch(`${audioDbRootUrl}/album.php?m=${id}`, audioDbOptions)
    const album = await response.json()
    return album;
}

module.exports = { getAlbumsByArtist, getAlbumById }
