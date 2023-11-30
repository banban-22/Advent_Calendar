const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async function verify(
    email,
    password,
    callback
  ) {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return callback(null, false, {
          message: 'Incorrect Email or Password.',
        });
      }

      const isMatch = await user.comparePassword(password);

      if (isMatch) {
        return callback(null, user);
      } else {
        return callback(null, false, {
          message: 'Incorrect Email or Password.',
        });
      }
    } catch (err) {
      return callback(err);
    }
  })
);

function signup({ name, email, password, req }) {
  const user = new User({ name, email, password });
  if (!email || !password) {
    throw new Error('Please provide an email and password.');
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error('Email is already in use.');
      }
      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        req.login(user, (err) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
}

async function login({ email, password, req }) {
  return await new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        console.error('Passport authentication error:', err);
        return reject(err);
      }

      if (!user) {
        return reject(new Error('Incorrect Email or Password.'));
      }

      req.login(user, (err) => {
        if (err) {
          console.error('Error during req.login:', err);
          return reject(err);
        }

        resolve(user);
      });
    })({ body: { email, password } });
  });
}

module.exports = { signup, login };
