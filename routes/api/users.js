const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User')

// @route  POST api/users
// @desc   register user
// @access public 
router.post('/', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, password} = req.body;

    try {
      //see if user exists
      let user = await User.findOne({email})
      if(user) {
        return res.status(400).json({errors: [{msg: 'User already exists'}]})
      }
           
      //get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',  //size rating and default
        r: 'pg',
        d: 'mm'
      })
          //create user
      user = new User({
        name,
        email,
        avatar,
        password
      })

      //encrypt/hash password
      const salt = await bcrypt.genSalt(10)  //passing in rounds, recommened 10

      user.password = await bcrypt.hash(password, salt);

          //save user in database
      await user.save();
      
      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

          //sign the token, pass in payload, secret, expiration(optional). Inside
          //the callback, we get error or token, if token then send back to client
      jwt.sign(       
        payload, 
        config.get('jwtSecret'),  
        {expiresIn: 360000},  //in production 3600 = 1 hr, for development add 00s :)
        (err, token) => {
          if(err) throw err;
          res.json({token}) //can send userID if want
        }
      );
    } catch(error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }    
  }
);

module.exports = router;