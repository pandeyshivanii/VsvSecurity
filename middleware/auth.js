const User = require('../database/model/UserSchema')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const authorizeAdmin = async (req, res, next) => {
    try {

        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const user = await User.findById(decoded.id);


        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }


        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { authorizeAdmin };