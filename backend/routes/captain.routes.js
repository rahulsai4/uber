const express = require("express");
const router = express.Router();
const authMW = require("../middleware/auth.middleware");

const { body } = require("express-validator");

const CaptainController = require("../controllers/captain.controller");

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("fullName.firstName")
            .isLength({ min: 3 })
            .withMessage("First Name must be at least 3 chars long"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 chars long"),

        body("vehicle.color")
            .isString()
            .withMessage("Vehicle color must be a string")
            .isLength({ min: 3 })
            .withMessage("Color must be at least 3 chars long"),

        body("vehicle.plate")
            .isString()
            .withMessage("Vehicle plate must be a string")
            .isLength({ min: 3 })
            .withMessage("Plate must be at least 3 chars long"),

        body("vehicle.capacity")
            .isInt({ min: 1 })
            .withMessage("Capacity must be at least 2"),
    ],
    CaptainController.registerCaptain
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 chars long"),
    ],
    CaptainController.loginCaptain
);

router.get("/profile", authMW.authCaptain, CaptainController.getCaptainProfile);

router.get("/logout", authMW.authCaptain, CaptainController.logoutCaptain);

module.exports = router;
