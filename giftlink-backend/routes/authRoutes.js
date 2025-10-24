/*jshint esversion: 8 */
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const connectToDatabase = require("../models/db");
const dotenv = require("dotenv");
const pino = require("pino");
const bcrypt = require("bcryptjs/dist/bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

dotenv.config();
const app = express();
const router = express.Router();
const logger = pino();

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      throw new Error("Credentials has not been provided");
    }

    // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
    const db = await connectToDatabase("giftsdb");
    // Task 2: Access MongoDB collection
    const collection = await db.collection("users");
    //Task 3: Check for existing email
    const existEmail = await collection.findOne({ email });

    if (existEmail) {
      throw new Error("Email already registered!");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    const newUser = await collection.insertOne({
      email,
      firstName,
      lastName,
      password: hashedPass,
      createdAt: new Date(),
    });

    const payload = {
      user: {
        id: newUser.insertedId,
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);

    logger.info("User registered successfully");
    res.json({ authtoken, email });
  } catch (error) {
    logger.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Credentials has not been provided");
    }

    const db = await connectToDatabase("giftsdb");
    const collection = await db.collection("users");

    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      const result = await bcryptjs.compare(password, existingUser.password);
      if (!result) {
        logger.error("Password does not match.");
        return res.status(404).json({ error: "Wrong password" });
      }

      const { firstName, email: dbEmail } = existingUser;

      const payload = {
        user: {
          id: existingUser._id.toString(),
        },
      };

      const authtoken = jwt.sign(payload, JWT_SECRET);
      logger.info("User logged in successfully");

      return res
        .status(200)
        .json({ authtoken, userName: firstName, userEmail: dbEmail });
    } else {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.put("/update", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Validation errors in update request", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const email = req.headers.email;

    if (!email) {
      logger.error("Email not found in the request headers");
      return res
        .status(400)
        .json({ error: "Email not found in the request headers" });
    }

    const db = await connectToDatabase("giftsdb");
    const collection = await db.collection("users");
    const existingUser = await collection.findOne({ email });

    if (!existingUser) {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    existingUser.updatedAt = new Date();

    const updatedUser = await collection.findOneAndUpdate(
      { email },
      { $set: existingUser },
      { returnDocument: "after" }
    );

    const payload = {
      user: {
        id: updatedUser._id.toString(),
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);
    logger.info("User updated successfully");

    res.json({ authtoken });
  } catch (error) {
    logger.error(error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
