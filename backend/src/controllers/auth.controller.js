const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
     
        const { fullName, email, password } = req.body; // Destructure the request body

        // Check if the user already exists
        const isUserAlreadyExists = await UserModel.findOne({ email });
        if (isUserAlreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }   
        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
             fullName,
             email,
             password: hashedPassword})

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(201).json({ 
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
        
}
async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
             message: "Invalid email or password"
             })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
             message: "Invalid email or password"
             })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(200).json({
         message: "User logged in successfully",
         user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
         }
          })
}
function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    })
}

module.exports = { registerUser, loginUser,logoutUser };
