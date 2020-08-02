const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pet",
            required: true,
        },
    },
    { timestamps: { createdAt: "time" } },
);
module.exports = mongoose.model("meal", schema);