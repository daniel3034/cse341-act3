import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/login/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

router.get('/me', (req, res) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    res.send(`Logged in as ${req.session.passport.user.displayName || req.session.passport.user.username}`);
  } else {
    res.send('Logged Out');
  }
});

export default router;
