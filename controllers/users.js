module.exports = {
    signUp: async (req, res, next) => {

        console.log('contents of req.value.body', req.value.body);
        console.log('UserController.signUp() called!');
        next();
    }, 

    signIn: async (req, res, next) => {
        console.log('UserController.signIn() called!');
    },

    secret: async (req, res, next) => {
        console.log('UserController.secret() called!');
    }
}
