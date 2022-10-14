const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require('jsonwebtoken')
// const { sendWelcomeEmail } = require('../utilities/mail');

const PRIVATE_KEY = 'vatsal123'

module.exports = {

  signupUser: async (req, res) => {
      try{
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt)
        var user = await User.create(req.body);
        res.status(201).send(user);
      }catch(error){
        res.status(400).send(error)
      }
      // sendWelcomeEmail(req.body.email, req.body.firstName)
    },

  loginUser: async (req, res) => {
      const jwt = sign({}, PRIVATE_KEY, {
        expiresIn: "24h",
      });

      // console.log('jwt = ', jwt, 'email = ', req.body.email)

      try {
        const response = await User.update({ token: jwt }, {
          where: { email: req.body.email }
        })
        // console.log('updated = ', response);

        return res.status(200).send({
          success: 1,
          token: jwt
        })
      } catch (err) {
        console.log(err)
        return res.status(500).send({
          success: 0,
          message: err.message
        })
      }
    },

  findAllUser : async (req, res) => {
      const firstName = req.query.firstName;
      var condition = firstName ? { firstName : { [Op.iLike]: `%${firstName}%` } } : null;

      User.findAll({ where: condition })

        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Somethings went wrong data not found"
          });
        });
    },

  findOneUser : (req, res) => {
      const id = req.params.id;

      User.findByPk(id)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving data with id=" + id
          });
        });
    },

  deleteUser : (req, res) => {
    const id = req.params.id;
    // console.log(id, ':: id')
    
    User.destroy({
      where: { id: id }
    })
      .then(num => 
      {
        if (num == 1) {
          res.send({
            message: `Data deleted successfully!`
          });
        } else {
          res.send({
            message: `Cannot delete id no. is ${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete with id=" + id
        });
      });
  },

  updateUser : (req, res) => {
    
    const id = req.body.id;
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    // console.log(id, ':: id')
    // console.log(body, ':: body')

    User.update(req.body, {
      where: { id: id }
    })
      .then((num) => {
          if (num == 1) {
          res.send({
            message: "Data updated successfully."
          });
          // res.send(body)
        } else {
          res.send({
            message: `Cannot update user with id= ${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  }

}