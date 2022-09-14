const {Schema, model} = require("mongoose");

const UserSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, require: true },
        email: {type: String, required:true, unique: true},
        location: String,
        occupation: String,
        info: String
    }
)
const User = model("User", UserSchema);
module.exports = User;