const mongoose = require("mongoose");


const Schema = mongoose.Schema;
 
// установка схемы
const userScheme = new Schema({
    name: String,
    Passengers: String,
    from: String,
    to: String,
    phone: String,
    email: String,
});

const User = mongoose.model("User", userScheme);

module.exports = User