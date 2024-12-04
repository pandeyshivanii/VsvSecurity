const jwt = require('jsonwebtoken')
const User = require('../../database/model/UserSchema')
const dotenv = require('dotenv')

dotenv.config()
const getAllUsers = async (req, res) => {

    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401).json({ message: "401 Unauthorized" })
        }
        const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY)
        const userLoggedId = verifiedUser.id
        const users = await User.find({});
        return res.status(201).json({ message: `Hello Admin`, users })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error })
    }

}
module.exports = getAllUsers