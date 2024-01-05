const mongoose = require("mongoose");

// Replace <connection-string> with your actual MongoDB connection string
const connectionString =
  "mongodb+srv://root:root123@cluster0.fuz20.mongodb.net/map-integration?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event handlers for successful connection and error
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Model for user
var users = new mongoose.Schema({
  Email: String,
  HashedPassword: String,
});

const user = mongoose.model("Users", users);

// Model for
var coordinates = new mongoose.Schema({
  userId: String,
  lat: String,
  lng: String,
});

const coordinate = mongoose.model("Coordinates", coordinates);

module.exports = { user, coordinate };
