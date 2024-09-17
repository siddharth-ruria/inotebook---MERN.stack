const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();

// backend will run on port: 5000
const port = 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend ~ listening on port ${port}`);
});
