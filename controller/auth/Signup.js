const User = require('../../database/model/UserSchema')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const { createSecretToken } = require('../../token/generateToken')

dotenv.config()


const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!(username, email, password)) {
            return res.status(400).json({ message: "Fill All the details" })
        }

        const oldUser = await User.findOne({ emailId: email });
        if (oldUser) {
            return res.status(409).json({ message: "Already existed" });
        }
        const hashedPassword = await bcrypt.hash(password, process.env.SALT)
        const user = new User({ username, email, password: hashedPassword })
        await user.save()
        const token = createSecretToken(user._id)
        res.cookie("token", token, {
            domain: process.env.FRONTENT_DOMAIN,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        return res.status(201).json({ message: "User registered Successfully", user })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server error", error: err })

    }
}
module.exports = signup