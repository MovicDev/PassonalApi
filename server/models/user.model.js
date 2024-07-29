const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    message: { type: String}
})

const genSchema = new mongoose.Schema({
    answer: { type: String, required: true }
});

let userModel = mongoose.model("user", userSchema);
let genModel = mongoose.model("answer", genSchema);

module.exports = { userModel, genModel };
