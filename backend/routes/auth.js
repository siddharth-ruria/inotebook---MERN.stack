const express = require("express");
const router = express.Router();
const UserSchema = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  // route (/api/auth)
  "",

  // array of middleware function. checks req.body and does the mentioned validations
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be of 5 chars minimum").isLength({
      min: 5,
    }),
  ],

  // async function checking for errors
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // creates new user if code moves forward to here
    try {
      const user = await UserSchema.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // sends response if user is successfully create
      return res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

module.exports = router;
