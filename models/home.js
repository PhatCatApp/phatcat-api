const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
    },
    name: {
        type: String,
        required: true,
    },
    pets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "pet",
    },
});

module.exports = mongoose.model("home", schema);