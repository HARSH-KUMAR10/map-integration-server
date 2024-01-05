const express = require("express");
const GenericResponse = require("../payload/GenericResponse");
const router = express.Router();
const db = require("../utils/db");
const jwt = require("../utils/jwt");

function checkNumber(number) {
  if (number) return true;
  return false;
}

router.post("/coordinate", jwt.authenticateToken, (req, res) => {
  const { lat, lng } = req.body;
  if (!checkNumber(lat) || !checkNumber(lng)) {
    res.json(
      new GenericResponse(
        404,
        false,
        "Please check lat and lng values",
        null,
        null
      )
    );
  }
  const user = jwt.decodeToken(req, res);

  db.coordinate.collection.insertOne(
    { userId: user._id, lat, lng },
    (err, result) => {
      console.log(result, err);
      if (!err && result) {
        res.json(
          new GenericResponse(
            200,
            true,
            "Added place coordinates.",
            result,
            null
          )
        );
      } else {
        res.json(
          new GenericResponse(
            400,
            false,
            "Failed add coordinates, please try again later.",
            null,
            null
          )
        );
      }
    }
  );
});

router.get("/coordinate", jwt.authenticateToken, (req, res) => {
  const user = jwt.decodeToken(req, res);
  db.coordinate
    .find({
      userId: user._id,
    })
    .then((result, error) => {
      if (!error && result) {
        res.json(
          new GenericResponse(
            200,
            true,
            "Successfully fetch all the saved coordinates",
            result,
            null
          )
        );
      } else {
        res.json(
          new GenericResponse(
            400,
            false,
            "Failed to find coordinates, please try again later.",
            null,
            null
          )
        );
      }
    });
});

module.exports = router;
