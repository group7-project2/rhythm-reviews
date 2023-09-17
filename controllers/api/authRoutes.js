const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth')
const stylesPath = "../../../public/css/style.css"

// Create account
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

    });

    return res.render('homepage', {
      stylesPath: stylesPath,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    return res.render('homepage', { error });
  }
});

// Login User TEst
router.post('/login', async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send('You need to provide an email and password');
    }
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      
      req.session.regenerate((err) => {
        if (err) next(err)

        req.session.user_id = user.id;
        req.session.logged_in = true;
        console.log(JSON.stringify(req.session))

        req.session.save((err) => {
          if (err) return next(err);
          res.redirect('/')
        })
      })
    } else {
      return res.status(400).json({ message: 'Invalid email or password'});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error)
  }
});

// // Login User
// router.post('/login', async (req, res) => {
//   try {
//     if (!req.body.email || !req.body.password) {
//       return res.status(400).send('You need to provide an email and password');
//     }
//     const user = await User.findOne({ where: { email: req.body.email } });
//     if (user && bcrypt.compareSync(req.body.password, user.password)) {
      
//       req.session.save(() => {
//         req.session.user_id = user.id;
//         req.session.logged_in = true;
//         console.log(JSON.stringify(req.session))
//       });

//       // Check if there's a newPassword in the session
//       if (req.session.newPassword) {
//         const newPasswordHash = bcrypt.hashSync(req.session.newPassword, 10);
//         user.password = req.session.password;
//         await user.save();

//         delete req.session.newPassword;
//       }
//       return res.render('homepage', {
//         stylesPath: stylesPath,
//         logged_in: req.session.logged_in
//       });
//     } else {
//       return res.status(400).json({ message: 'Invalid email or password'});
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send(error)
//   }
// });

// Logout User Test
router.get('/logout', async (req, res) => {
  req.session.user_id = null;
  req.session.logged_in = false;
  req.session.save((err) => {
    if (err) next(err);

    req.session.regenerate((err) => {
      if (err) next(err);
      res.redirect('/')
    })
  });
});

// // Logout User
// router.get('/logout', async (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       return res.status(204).redirect('/');
//     });
//   } else {
//     return res.status(404).end();
//   }
// });

router.post('/profile/password', withAuth, async (req, res) => {
  try {
      const user = await User.findByPk(req.session.user_id);

      // Verify the current password
      const isValidPassword = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isValidPassword) {
          return res.status(400).render('profile', {
              user,
              error: 'Invalid current password',
          });
      }

      // Check if the new password and confirmation match
      if (req.body.newPassword !== req.body.confirmPassword) {
          return res.status(400).render('profile', {
              user,
              error: 'New password and confirmation do not match',
          });
      }

      // Update the password
      user.password = req.body.newPassword;
      await user.save();

      res.redirect('/profile');
  } catch (error) {
      console.error(error);
      return res.status(500).json(error);
  }
});

module.exports = router;