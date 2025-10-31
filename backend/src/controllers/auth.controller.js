const UserModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cookie options: secure defaults suitable for dev and production
const isProd = process.env.NODE_ENV === 'production';
const cookieOptions = {
    httpOnly: true,
    secure: isProd,              // required when sameSite is 'none' (in production)
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

async function registerUser(req, res) {
     
        const { fullName, email,phone, password } = req.body; // Destructure the request body

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
             phone,
             password: hashedPassword})

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET)

    res.cookie("token", token, cookieOptions)

        res.status(201).json({ 
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                phone: user.phone
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
    res.cookie("token", token, cookieOptions)

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
    // Use same options to ensure cookie is cleared correctly across environments
    res.clearCookie("token", cookieOptions);
    res.status(200).json({
        message: "User logged out successfully"
    })
}
async function registerFoodPartner(req, res) {
     
    const { name, email, password,phone,address,ownerName } = req.body; // Destructure the request body
    // Check if the user already exists
    const isUserAlreadyExists = await foodPartnerModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'Food Partner already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const foodPartner = await foodPartnerModel.create({
         name,
         email,
         password: hashedPassword,
         phone,
         address,
         ownerName
        })
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, cookieOptions)

    res.status(201).json({
        message: "Food Partner registered successfully",
        foodPartner: {
            id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            ownerName: foodPartner.ownerName,
            phone: foodPartner.phone,
            address: foodPartner.address
        }
    })
}
async function loginFoodPartner(req, res) {
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({
        email
    })
    if (!foodPartner) {
        return res.status(400).json({
             message: "Invalid email or password"
             })
    }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({
                message: "Invalid email or password"
                })
    }
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token, cookieOptions)
    res.status(200).json({
            message: "Food Partner logged in successfully",
            foodPartner: {
               id: foodPartner._id, // standardized to 'id' to match register response
               email: foodPartner.email,
               name: foodPartner.name
            }
        })

}
function logoutFoodPartner(req, res) {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({
        message: "Food Partner logged out successfully"
    })
}
module.exports = { registerUser, loginUser,logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner};
