const express = require("express");
const router = express.Router();
const notes = require("../controllers/notes");
router.get("/", (req, res) => {
	if (req.query.archived) return notes.getByArchivedValue(req, res);
	return notes.getAll(req, res);
});
router.get("/:noteId", notes.getNote);
router.post("/", notes.createNote);
router.put("/:noteId", notes.updateNote);
router.put("/:noteId/archive", notes.archiveNote);
router.delete("/:noteId", notes.deleteNote);

module.exports = router;
