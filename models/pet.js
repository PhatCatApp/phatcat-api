const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "home",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    kind: {
        type: String,
        enum: ["dog", "cat"],
    },
});

module.exports = mongoose.model("pet", schema);