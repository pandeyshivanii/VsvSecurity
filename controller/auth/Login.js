const User = require('../../database/model/UserSchema')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const { createSecretToken } = require('../../token/generateToken')

dotenv.config()


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!(email && password)) {

            return res.status(400).json({ message: "Please provide the input" });
        }

        const user = await User.findOne({ email: email });
        console.log(user)
        if (!(user && (await bcrypt.compare(password, user.password)))) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = createSecretToken(user._id)
        res.cookie("token", token, {
            domain: process.env.FRONTENT_DOMAIN,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        return res.status(201).json({ message: "User logged in Successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server error", error: err })

    }
}
module.exports = login