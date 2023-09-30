const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => res.send("It's up!"));
router.use("/api/notes", require("./notes"));
router.use("/api/categories", require("./categories"));
router.use("/api/users", require("./users"));

module.exports = router;
