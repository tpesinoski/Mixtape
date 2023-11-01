const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs')
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { login, signUp } = require('../middlewares/auth');


router.post('/login', login);
router.post('/register', signUp);
// router.post('/register', (req, res, next) => {
//     try {
//         var salt = bcrypt.genSaltSync(10);
//         var hash = bcrypt.hashSync(req.body.password, salt);
//         const newAdmin = new Admin({
//             username: req.body.username,
//             password: hash
//         });
//         newAdmin.save();
//         res.status(200).send("Admin has been created");
//     } catch (err) {
//         next(err)
//     }
// })

// router.post('/login', async (req, res, next) => {
//     try {
//         const admin = await Admin.findOne({ username: req.body.username })
//         if (!admin) {
//             return res.status(400).send("User not foundd")
//         }
//         const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password);
//         if (!isPasswordCorrect) {
//             return res.status(400).send("Error user foufnd")
//         }
//         res.status(200).send("Logined in");
//     }
//     catch (err) {
//         next(err);
//     }
// });

router.get('/users', async (req, res, next) => {
    try {
        const users = await Admin.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(404).send("No users found");
    }
});

module.exports = router;