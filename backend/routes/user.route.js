const express = require("express");
const { body } = require("express-validator");
const UserController = require("../controllers/user.controller");
const authMW = require("../middleware/auth.middleware");

const router = express.Router();
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
    ],
    UserController.registerUser
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 chars long"),
    ],
    UserController.loginUser
);

router.get("/profile", authMW.authUser, UserController.getUserProfile);

router.get("/logout", authMW.authUser, UserController.logoutUser);

module.exports = router;
