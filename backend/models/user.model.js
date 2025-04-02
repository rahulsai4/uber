const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First Name must be at least 3 chars long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last Name must be at least 3 chars long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 chars long"],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password must be at least  chars long"],
    },
    socketId: {
        type: String,
    },
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
