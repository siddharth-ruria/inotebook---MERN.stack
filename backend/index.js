const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("welcome to the express server");
});

app.listen(port, () => {
  console.log(`server listening to requests on port ${port}`);
});
