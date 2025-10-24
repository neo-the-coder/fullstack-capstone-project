const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const dotenv = require('dotenv');
const pino = require('pino');

const JWT_SECRET = process.env.JWT_SECRET;

dotenv.config();
const app = express();
const router = express.Router();
const logger = pino();

//Step 1 - Task 4: Create JWT secret

router.post('/register', async (req, res) => {
    try {
        const {email, password, firstName, lastName} = req.body;

        if (!email || !password || !firstName || !lastName) {
            throw new Error('Credentials has not been provided');
        }

        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase('giftsdb');
        // Task 2: Access MongoDB collection
        const collection = await db.collection('users');
        //Task 3: Check for existing email
        const existEmail = await collection.findOne({email});

        if (existEmail) {
            throw new Error('Email already registered!')
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);

        const newUser = await collection.insertOne({
            email,
            firstName,
            lastName,
            password: hashedPass,
            createdAt: new Date()
        })

        const payload = {
            user: {
                id: newUser.insertedId,
            }
        }

        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User registered successfully');
        res.json({authtoken,email});
    } catch (e) {
         return res.status(500).send('Internal server error');
    }

    

});

module.exports = router;