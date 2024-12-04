const mongoose = require("mongoose");

const DBConnect = () => {
    const MONGO_URI =
        process.env.MONGO_URI || "mongodb://localhost:27017/authenticator";
    mongoose
        .connect(MONGO_URI)
        .then(() => console.log("Database connected Successfully"))
        .catch((err) => console.log(`You are getting this err ${err}`));
};
module.exports = DBConnect