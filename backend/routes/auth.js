const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
require('dotenv/config')

const jwt_secret = process.env.JWT_SECRET;

//-----------------------[Route:1] Create user using : post "/api/auth/createuser"-------Login not required-----------
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //Using try catch for catching any error
    let success = false;
    try {
      //If there are any errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success,error: errors.array() });
      }
      //Checking if email already exist or not (for new user email should be unique)
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry, email already exists" });
      }

      //Generating salt fron bcrypt and attaching to the password present in body section of thunderclient request
      let salt = await bcrypt.genSalt(10);
      let securedPw = await bcrypt.hash(req.body.password, salt);

      //If no errors then Create new users and store it in DB
      user = await User.create({
        name: req.body.name,
        password: securedPw,
        email: req.body.email,
      });

      //Using Json web token
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//-------------------[Route:2] Authenticating user using : post "/api/auth/login"------Login Required------------
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").exists(),
  ],
  async (req, res) => {
    let success = false;
    try {
      //If there are any errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      //email,password entered by the user destructured from req.body
      const { email, password } = req.body;

      //Checking email already exist or not (for already logged in user)
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      //Checking password entered is correct or not
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }
      //Providing Json web token
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, jwt_secret);
      success=true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//-------------------[Route:3] getting user details using : post "/api/auth/getuser"---Login not required--------
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
