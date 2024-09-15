const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    id: "1",
    color: "black",
  };
  res.json(obj);
});

module.exports = router;
