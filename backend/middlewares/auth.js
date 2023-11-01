const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');
require('dotenv');

const authorize = (req, res, next) => {
    if (req.get("Authorization")) {
        const token = req.get("Authorization");
        let verifyToken;
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            console.log(`Error in authorization middleware ${err}`);
            return res.status(401).json({ message: "Bad credentials" });
        }
        req.username = verifyToken.username;
        return next();
    }
    else {
        return res.status(401).json({ message: "Bad credentials" });
    }
}
const signUp = async (req, res, next) => {
    try {
        const { username, password, confPassword } = req.body;
        const admin = await Admin.findOne({ username: username });
        if (admin) {
            return res.status(400).json({ message: "User with this username already exist!" });
        }
        if (password !== confPassword) {
            return res.status(400).json({ message: "Passwords do not match!" })
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newAdmin = new Admin({
            username: req.body.username,
            password: hashPassword
        });
        await newAdmin.save();
        return res.status(200).json({ message: "User added successfully!" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Adding user failed" });
        throw new Error("Adding user failed");
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await Admin.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User with this username does not exist." });
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ username: user.username },
            process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Loged in successfully!", token });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Authentication failed" });
        throw new Error("Authentication failed");
    }
}
module.exports = {
    login,
    signUp,
    authorize
}