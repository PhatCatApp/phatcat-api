const express = require("express");
const passport = require("passport");

require("../passport");

const router = express.Router();

router.post("/auth/google", passport.authenticate("google-token"), async (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;