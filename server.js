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

// Define the path to your static files (CSS, images, etc.)
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// Handlebars setup
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
  res.render('homepage'); // Render the "home" view without specifying a layout
});

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});
