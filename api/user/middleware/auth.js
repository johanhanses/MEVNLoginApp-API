const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async (req, res, next) => {
    try {
        //get token
        const token = req.body.Authorization.replace("Bearer ", "");

        // verify token
        const decoded = jwt.verify(token, "secret");

        // find the user in the DB
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentification Failed",
        });
    }
};
