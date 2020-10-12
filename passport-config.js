const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const client = require('./db')

module.exports = function(passport) {
  passport.use(
    new localStrategy({usernameField: 'email'}, async(email, password, done) => {
      const user = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      const exists = user.rows.length >= 1 ? true : false;
      if (exists === false) {
        return done(null, false, { message: "No user with that email"})
      };
      const foundUser = user.rows[0]
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, foundUser)
        } else {
          return done(null, false, { message: "Password incorrect"})
        }
      })
    })
  )
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  })
  passport.deserializeUser((id, cb) => {
    client.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
      if (err) throw err
      return cb(null, result.rows[0])
    })
  })
}
