const PORT = process.env.PORT || 3001;

const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());


app.get("/api", (req, res) => {
  // res.json({ message: "Hello from server!" });
  res.send("Hello from server!");
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});