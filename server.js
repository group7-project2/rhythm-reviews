const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection.js');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const stylesPath = "../../public/css/style.css"

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
const routes = require('./controllers/index.js');
app.use(routes);

// Log all routes
function logRoutes(router, basePath = '') {
  router.stack.forEach((layer) => {
    if (layer.route) {
      const route = basePath + layer.route.path;
      console.log(`Route: ${route}`);
    } else if (layer.name === 'router' && layer.handle.stack) {
      // Recursive call for sub-routers
      logRoutes(layer.handle, basePath + layer.regexp.source);
    }
  });
}

// Log all routes in the router
logRoutes(routes);

// const authRoutes = require('./controllers/api/authRoutes');
// const reviewRoutes = require('./controllers/api/reviewRoutes');

// Use the routes
// app.use('/auth', authRoutes);
// app.use('/reviews', reviewRoutes);

// Define the route for the root path ('/')
app.get('/', (req, res) => {
  res.render('homepage', {
    stylesPath: stylesPath,
    logged_in: req.session.logged_in
  }); 
});

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});