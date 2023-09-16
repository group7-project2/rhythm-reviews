const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth')

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


// Login User
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
      });

      // Check if there's a newPassword in the session
      if (req.session.newPassword) {
        const newPasswordHash = bcrypt.hashSync(req.session.newPassword, 10);
        user.password = req.session.password;
        await user.save();

        delete req.session.newPassword;
      }

      return res.render('homepage', {
        stylesPath: stylesPath,
        logged_in: req.session.logged_in
      });
    } else {
      return res.render('login', { error: 'Invalid email or password' });
    }
  } catch (error) {
    return res.render('login', { error });
  }
});

// Logout User
router.get('/logout', async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      return res.status(204).redirect('/');
    });
  } else {
    return res.status(404).end();
  }
});

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