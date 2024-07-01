const User = require("../models/user")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
dotenv.config();

const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "please fill all the fields"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        const userDetails = await User.findOne({ email })

        if (userDetails) {
            return res.status(400).json({
                message: "You are already registed please login"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const userData = new User({
            name,
            email,
            password: hashedPassword
        })

        await userData.save();
        res.json({ Message: "user registerd succesfully" })
    } catch (error) {
        res.json({ errorMessage: "something went wrong" })
    }
}


const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const userDetails = await User.findOne({ email })

        if (!userDetails) {
            return res.status(401).json({
                Message: "Inavalid Credentials"
            })
        }

        const passwordMatch = await bcrypt.compare(password, userDetails.password)

        if (!passwordMatch) {
            return res.status(401).json({
                errorMessage: "Wrong Password"
            })
        }

        const token = jwt.sign(
            { userId: userDetails._id, name: userDetails.name },
            process.env.SECRET_CODE,
            { expiresIn: "60h" }
        );

        res.json({
            message: "User logged in",
            token: token,
            name: userDetails.name,
            userId: userDetails?._id,
        });
    } catch (error) {
        res.json({
            errorMessage: "user not registerd"
        })
    }
}



const updateUser = async (req, res) => {
    try {
        const { name, updateEmail, oldPassword, newPassword, emails } = req.body;
        const { id } = req.params;

        console.log(id)

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (emails) {
            user.storeEmails = emails;
        }


        if (name) {

            user.name = name;
        }
        if (updateEmail) {

            user.email = updateEmail;
        }

        if (newPassword) {

            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect old password' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.json({ message: 'User data updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getUser = async (req, res) => {

    try {
        const { id } = req.params;
        const result = await Todo.find({ createdBy: id });
        if (result) {
            res.status(200).json({data : result});
        } else {
            res.status(404).json({ message: "User not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to get User", error: error.message });
    }
}


module.exports = { loginUser, registerUser, updateUser ,getUser};