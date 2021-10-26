const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route  GET api/auth
// @desc   Test route
// @access public 
router.get('/', auth, async (req, res) => { //to use auth middleware, we just add it as a second param
  try {
    const user = await User.findById(req.user.id).select('-password')  //this leaves off the password in the data
    res.json(user);
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


module.exports = router;