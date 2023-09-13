const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection.js');
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
  extname: '.handlebars',
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

  const artistName = req.query.artistName;

  
  if (!artistName || artistName.trim() === '') {
    // return res.status(400).json({ message: 'Please enter a valid artist name.' });
   res.status(400).render('homepage', {message: 'Please enter a valid artist name.' });
  }
  try{
  const searchResult = await fetch(`${audioDbRootUrl}/searchalbum.php?s=${req.query.artistName}`, audioDbOptions)
  const albums = await searchResult.json()
  
  res.render('results', {albums: albums.album});
} catch (error) {
  res.status(500).render('homepage', {message: 'Error occured while fetching data.' });
}
  
});

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});