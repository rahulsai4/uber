const { validationResult } = require("express-validator");
const CaptainModel = require("../models/captain.model");
const CaptainService = require("../service/captain.service");
const BlacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const captainExists = await CaptainModel.findOne({ email });
    if (captainExists) {
        return res.status(400).json({ message: "Captain Already Exists" });
    }

    const hashedPassword = await CaptainModel.hashPassword(password);

    const captain = await CaptainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateAuthToken();

    res.status(201).json({ captain, token });
};

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await CaptainModel.findOne({ email }).select("+password");

    if (!captain) {
        return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ captain, token });
};

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await BlacklistTokenModel.create({ token: token });

    res.clearCookie("token");

    res.status(200).json({ message: "Logged out" });
};
