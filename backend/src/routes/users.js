const express = require("express");
const router = express.Router();
const user = require("../controllers/users");

router.post("/", user.createUser);
router.post("/login", user.verifyUser);

module.exports = router;
