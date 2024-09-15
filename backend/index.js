const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = 3000;

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes")); 

app.get("/", (req, res) => {
  res.send("welcome to the express server");
});

app.listen(port, () => {
  console.log(`server listening to requests on port ${port}`);
});
