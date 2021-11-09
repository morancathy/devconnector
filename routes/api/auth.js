const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route  GET api/auth
// @desc   Test route
// @access public
router.get("/", auth, async (req, res) => {
  //to use auth middleware, we just add it as a second param
  try {
    const user = await User.findById(req.user.id).select("-password"); //this leaves off the password in the data
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desc   authenticate user & get token
// @access public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      //sign the token, pass in payload, secret, expiration(optional). Inside
      //the callback, we get error or token, if token then send back to client
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 }, //in production 3600 = 1 hr, for development add 00s :)
        (err, token) => {
          if (err) throw err;
          res.json({ token }); //can send userID if want
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
