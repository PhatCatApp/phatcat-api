const express = require("express");
const passport = require("passport");

require("../passport");

const router = express.Router();

router.get("/me", passport.authenticate("google-token"), async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;