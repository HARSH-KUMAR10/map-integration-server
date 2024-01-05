const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const auth = require("./module/auth");
const GenericResponse = require("./payload/GenericResponse");
const coordinate = require("./module/coordinates");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("", (req, res) => {
  res.json(new GenericResponse(200, true, "Server connected", null, null));
});

app.use("/api/v1", auth);
app.use("/api/v1", coordinate);

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
