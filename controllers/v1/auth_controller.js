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
const banUserModel = require('./../../models/userBan_model');


// ----- Register User -----
exports.register = async (req, res) => {
    try {
        
        // Validate incoming request body using the custom validator
        const isBodyValid = registerValidator(req.body);
    
        if(isBodyValid !== true) {
            return res.status(422).json({errors: isBodyValid}); // Unprocessable Entity for validation errors
        }
    
        // Destructure required fields from request body
        const {name, username, email, password} = req.body;

        // Check if a user with the same username or email already exists
        const userAlreadyExist = await userModel.findOne({
                $or: [ {username}, {email}]
        });
    
        if(userAlreadyExist) {
            
            if(userAlreadyExist.status === "BANNED") {
                return res.status(403).json( {message: "Registration failed. This account is banned and cannot be used."}); // Forbidden
            }

            if(userAlreadyExist.email === email) {
                return res.status(409).json( {message: "The email address is already registered. Please use a different email."}); // Conflict error
            }

            if(userAlreadyExist.username === username) {
                return res.status(409).json( {message: "The username is already taken. Please choose a different username." }); // Conflict error
            }
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
        return res.status(500).json({message: "Internal server error."});      
    }

};


exports.login = async(req, res) => {

    try {
        console.log(req.body);
        
        const {identifier, password} = req.body;

        // Find user by email or username
        const user = await userModel.findOne({
            $or:[{email: identifier}, {username: identifier}]
        }).lean();

        // Check if user exists
        if(!user) {
            return res.status(401).json({message: "user not found."});
        }

        // Check if the user is banned
        if(user.status === "BANNED") {
            return res.status(403).json({message: "This account is banned. Please contact support."});
        }
    
        // Validate password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);   
        if(!isPasswordCorrect) {
            return res.status(401).json({message: "Incorrect Password."});
        }
    
        // Generate JWT token
        const accessToken = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {expiresIn: "10d"});
    
        // Return some basic user information along with the token
        res.json({
            accessToken,
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status
            },
            expiresIn: "10d"      
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};



