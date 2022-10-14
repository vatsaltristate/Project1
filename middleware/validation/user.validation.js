const { users } = require('../validation/user.schema');
const db = require("../../models");
const User = db.user;

module.exports = {

    addUserValidation : async (req, res, next) => {
        
        const value = await users.validate(req.body);
        if(value.error){
            res.json({
                success : 0,
                message : value.error.details[0].message
            })

        }else{
            next();
        }
    },


    doesAlreadyExist: async (req, res, next) => {
        const email = req.body.email
        const response = await User.findOne({
            where:{
                email:email
            },
            attributes: ['email']
        })
        if (response != null) {
            return res.status(409).send({
                success: 0,
                message: 'Email already exists'
            })
        }
        next()
    }

}

