const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();

// backend will run on port: 5000
const port = 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("welcome to the express server homepage");
});

app.listen(port, () => {
  console.log(`server listening to requests on port ${port}`);
});
