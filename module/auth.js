const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const db = require("../utils/db");
const GenericResponse = require("../payload/GenericResponse");
const jwt = require("../utils/jwt");

function hashPassword(password) {
  // Create a sha256 hash object, Update the hash object with the password, Get the hashed password in hexadecimal format
  return crypto.createHash("sha256").update(password, "utf-8").digest("hex");
}

function checkString(string) {
  if (string && string !== undefined && string != null && string.length >= 0)
    return true;
  return false;
}

router.post("/auth/sign-in", (req, res) => {
  const { email, password } = req.body;
  if (!checkString(email) || !checkString(password)) {
    res.json(
      new GenericResponse(
        404,
        false,
        "Please check email and password entered",
        null,
        null
      )
    );
  }
  db.user
    .findOne(
      {
        email: email,
        hashedPassword: hashPassword(password),
      },
      { hashedPassword: 0 }
    )
    .then((result, err) => {
      if (!err && result) {
        const jwtToken = jwt.generateToken(JSON.stringify(result));
        res.json(
          new GenericResponse(
            200,
            true,
            "Successfully logged-in",
            { jwtToken },
            null
          )
        );
      } else {
        res.json(
          new GenericResponse(
            400,
            false,
            "Failed to login, please check your credentials",
            null,
            null
          )
        );
      }
    });
});

router.post("/auth/sign-up", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, email, password);
  if (!checkString(email) || !checkString(password)) {
    res.json(
      new GenericResponse(
        404,
        false,
        "Please check email and password entered",
        null,
        null
      )
    );
  }
  db.user.collection.insertOne(
    { email, hashedPassword: hashPassword(password) },
    (err, result) => {
      if (err) {
        res.json(
          new GenericResponse(
            400,
            false,
            "Failed to create an account",
            null,
            err
          )
        );
      } else {
        res.json(
          new GenericResponse(
            200,
            true,
            "Created account successfully",
            result,
            null
          )
        );
      }
    }
  );
});

module.exports = router;
