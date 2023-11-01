const router = require('express').Router();
const { authorize } = require('../middlewares/auth');

router.get('/',authorize, (req, res, next) => {
    res.json({ message: "Successfully got discover" }); 
});
module.exports = router;