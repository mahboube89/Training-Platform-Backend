/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// ----- Custom modules -----
const userModel = require('../../models/user_model');
const registerValidator = require('../../validators/register_validator');


// ----- Register User -----
exports.register = async(req, res) => {
    try {
        
        // Validate incoming request body using the custom validator
        const isBodyValid = registerValidator(req.body);
    
        if(isBodyValid !== true) {
            return res.status(422).json(isBodyValid); // Unprocessable Entity for validation errors
        }
    
        // Destructure required fields from request body
        const {name, username, email, password} = req.body;
    
        // Check if a user with the same username or email already exists
        const userAlreadyExist = await userModel.findOne(
            {
                $or: [ {username}, {email}]
            }
        );
    
        if(userAlreadyExist) {
            return res.status(409).json( {message: "username or email is already taken."}); // Conflict error
        }
    
        // Determine if the new user should be an ADMIN (if first user)
        const countOfUsers = await userModel.countDocuments();
    
        // Hash the user's password using bcrypt before saving it
        const hashedPassword = await bcrypt.hash(password, 12);
    
        // Create a new user in the database
        const user = await userModel.create( {
            name,
            username,
            email,
            password : hashedPassword,
            role: countOfUsers > 0 ? "USER" : "ADMIN"
        });
    
        // Remove the password field from the user object before sending it in the response
        const userObject = user.toObject();
        Reflect.deleteProperty(userObject, "password");
    
        // Generate JWT access token with a 10-day expiration
        const accessToken = jwt.sign( {id: user._id}, process.env.JWT_SECRET, {expiresIn: "10d"});
    
        // Return the created user (without password) and the access token
        return res.status(201).json( {user:userObject , accessToken});

    } catch (error) {
        console.error("Error during registration: ", error);
        return res.status(500).json({message: "Internal server error."})       
    }

};


exports.login = async(req, res) => {

};


exports.getMe = async(req, res) => {

};

