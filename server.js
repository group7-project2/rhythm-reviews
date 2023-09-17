const path = require('path');
const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const helpers = require('./utils/helpers');
const stylesPath = "../../public/css/style.css"

const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));


// app.use(
//   session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     }),
//     proxy: true,
//     // name: "rhythm-reviews",
//     cookie: {
//       maxAge: 300000,
//       httpOnly: true,
//       secure: true,
//       sameSite: 'none',
//     },
//   })
// );

app.set('trust proxy', 1)
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'your secret text',
  cookie: {
    secure: true
  }
}))




const exphbs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  extname: '.handlebars',
  helpers: helpers
});

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

// Import and use the route files
const routes = require('./controllers/index.js');
app.use(routes);


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