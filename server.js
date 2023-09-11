const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection.js.BKP');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

const exphbs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
});

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

// Import and use the route files
const authRoutes = require('./controllers/api/authRoutes');
const reviewRoutes = require('./controllers/api/reviewRoutes');

// Use the routes
app.use('/auth', authRoutes);
app.use('/reviews', reviewRoutes);

// Define the route for the root path ('/')
app.get('/', (req, res) => {
  res.render('homepage'); 
});

const audioDbRootUrl = 'https://theaudiodb.p.rapidapi.com';
const audioDbOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3717db3bafmsh3630d39920bf588p1025c6jsnd065f1276f3c',
		'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
	}
};

app.get('/api/artist-search', async (req, res) => {

  const searchResult = await fetch(`${audioDbRootUrl}/searchalbum.php?s=${req.query.artistName}`, audioDbOptions)
  const data = await searchResult.json()
  res.json(data)
})
// Ashley TODO #1: define routes for audio db
// #1.1 - create RESTful GET endpoint for artist search
// ex: "/api/artist-search&artistName=Dethklok"
// create app.get for artist search that accepts a string query param of artist name and returns JSON of Artist's discography (discography.php?s={Artist_Name})
// ex: app.get("/api/artist-search"), async (req, res) => ...
// extract query parm out. ex. const artistName = req.query.artistName --> this stores the "&artistName"

// 2 create app.get for album lookup that accepts an artist string and album string. The album string should come from the above search based on what user selects. Artist should be the same
// as what the user searched in the box, so it'll be stored in the client side memory.
// return JSON of single album details (searchalbum.php?s={Artist name}&a={Album name})

// 3 based on which album the user picks, you will now have the album_ID which you can use to directly query the audio db for album lookups based on ID.
// this ID should be what you store in your DB as an external identifier for the album alongside your PK, or make this be your album PK.

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});


