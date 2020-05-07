const User = require("../model/User");

exports.registerNewUser = async (req, res) => {
    try {
        let isUser = await User.find({ email: req.body.email });

        console.log(isUser);

        if (isUser.length >= 1) {
            return res.status(409).json({
                message: "email already in use",
            });
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        let data = await user.save();
        const token = await user.generateAuthToken();

        res.status(201).json({ data, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({
                error: "Login failed! Check authentication credentials",
            });
        }

        const token = await user.generateAuthToken();

        res.status(200).json({ user, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        console.log(req.userData);

        req.user.tokens = [];

        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
};

exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};
