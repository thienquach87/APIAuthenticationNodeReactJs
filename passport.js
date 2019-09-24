const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const { JWT_SECRET } = require('./configuration');
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET 
}, async (payload, done) => {
    try {
        // find the user specified in token
        const user = await User.findById(payload.sub);
        
        // if user does not exists, handle it
        if(!user){
            return done(null, false);
        }
        // otherwise, return user
        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    // Find the user given the email
    console.log(email);
    const user = await User.findOne({ email });
  
    // If not, handle it
    if (!user) {
      return done(null, false);
    }
  
    // Check if the password is correct

    const isMatch = await user.isValidPassword(password);
    if (!isMatch){
        return done(null, false);
    }
    // If not, handle it
  
    // Otherwise, return the user
    done(null, user);
  }));