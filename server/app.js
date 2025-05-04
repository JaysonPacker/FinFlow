require("dotenv").config(); // Load environment variables from .env file
// Load // Load environment variables from .env file
const path = require("path");
const express = require("express");
const compression = require("compression");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");
const helmet = require("helmet");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");
const cors = require("cors");

const router = require("./router.js");

const port = process.env.PORT || process.env.NODE_PORT || 5000;

const dbURI = process.env.MONGODB_URI || "mongodb://localhost/FinFlow";
mongoose.connect(dbURI).catch((err) => {
  if (err) {
    console.log("couldn't connect to the server");
  }
});

const redisClient = redis.createClient({
  url: process.env.REDISCLOUD_URL,
});

redisClient.on("error", (err) => console.log("Redis Client error:", err));
redisClient.connect().then(() => {
  const app = express();
  app.use(helmet());

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Set up session management
  app.use(
    session({
      key: "sessionId",
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SECRET || "secret secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(cors());

  app.use("/api", router);

  app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(process.env.SECRET);
    console.log(`Server is listening on port ${port}`);
  });
});
