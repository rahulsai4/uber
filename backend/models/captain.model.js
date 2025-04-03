const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CaptainSchema = new mongoose.Schema({
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

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 chars long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 chars long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 2"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"],
        },
    },

    locations: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
});

CaptainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};

CaptainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

CaptainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Captain", CaptainSchema);
