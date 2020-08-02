const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    google_id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    homes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "home",
    },
    name: {
        type: String,
        // required: true,
    },
    pictureUrl: {
        type: String,
    },
    doneSetup: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = mongoose.model("user", schema);