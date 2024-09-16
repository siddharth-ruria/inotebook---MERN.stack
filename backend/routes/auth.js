const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "dollar$ignOnet1me";

// ------------------------------- ROUTE 1 -------------------------------

// route (/api/auth/createUser)

// POST -> creating a new user

router.post(
  "/createUser",

  // array of middleware function. checks req.body and does the mentioned validations
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be of 5 chars minimum").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // check if same email exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        error: "email already exists",
      });
    }

    // hashing the password using salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    securePass = await bcrypt.hash(req.body.password, salt);

    // creates new user if code moves forward to here
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      // creates jwt authentication token and sends it back.
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error :/");
    }
  }
);

// ------------------------------- ROUTE 2 -------------------------------

// route (/api/auth/authenticate)

// POST -> authenticating user

router.post(
  "/authenticate",

  // array of middleware function. checks req.body and does the mentioned validations
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],

  // validating user's login credentials logic
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: "wrong credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          error: "wrong credentials",
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error :/");
    }
  }
);

// ------------------------------- ROUTE 3 -------------------------------

// route (/api/auth/getUser)

// POST -> get logged in user details

router.post(
  "/getUser",

  // middleware function
  fetchUser,

  async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error :/");
    }
  }
);

module.exports = router;
