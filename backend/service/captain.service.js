const CaptainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) => {
    // Basic field validation
    if (
        !firstName ||
        !email ||
        !password ||
        !color ||
        !plate ||
        !capacity ||
        !vehicleType
    ) {
        throw new Error("All fields are required");
    }

    // Create and save the captain
    const captain = await CaptainModel.create({
        fullName: { firstName, lastName },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });

    return captain;
};
