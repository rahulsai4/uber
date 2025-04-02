const express = require("express");
const { body } = require("express-validator");
const UserController = require("../controllers/user.controller");

const router = express.Router();
router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("fullname.firstname")
            .isLength({ min: 3 })
            .withMessage("First Name must be at least 3 chars long"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 chars long"),
    ],
    UserController.registerUser
);

module.exports = router;
