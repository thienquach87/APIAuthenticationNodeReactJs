const JTW = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../configuration');

signToken = (user) => {
    return JTW.sign({
        iss: 'thien.quach',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    },JWT_SECRET);
}
module.exports = {
    signUp: async (req, res, next) => {

        const { email, password } = req.value.body;

        // Check if there is a user with the same email
        const foundUser = await User.findOne({ email });
        if (foundUser) { 
        return res.status(403).json({ error: 'Email is already in use'});
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        // Respond with token
        const token = signToken(newUser);
        res.status(200).json({token});
    }, 

    signIn: async (req, res, next) => {
        //generate token
        
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    secret: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({secret: "resource"});
    }
}
