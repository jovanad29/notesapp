const notesService = require("../services/notes");

exports.getAll = async (req, res) => {
	const { userId } = req.query;
	try {
		const notes = await notesService.getAll(userId);
		return res
			.status(200)
			.json({ statusCode: 200, statusText: "OK", result: notes });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

exports.getNote = async (req, res) => {
	const { userId } = req.query;
	const { noteId } = req.params;
	try {
		const notes = await notesService.getNote(userId, noteId);
		return res
			.status(200)
			.json({ statusCode: 200, statusText: "OK", result: notes });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

exports.getByArchivedValue = async (req, res) => {
	const { userId } = req.query;
	const archived = req.query.archived === "true";
	try {
		const notes = await notesService.getByArchivedValue(userId, archived);
		return res
			.status(200)
			.json({ statusCode: 200, statusText: "OK", result: notes });
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			statusCode: 400,
			statusText: "Error",
		});
	}
};

exports.createNote = async (req, res) => {
	const { userId } = req.query;
	const { title, content, categories } = req.body;
	try {
		const newNote = await notesService.createNote({
			userId,
			title,
			content,
			categories,
		});
		return res.status(201).json({
			statusCode: 201,
			statusText: "Note created successfuly",
			result: newNote,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			statusCode: 400,
			statusText: "Error",
			values: { ...req.body },
		});
	}
};

exports.archiveNote = async (req, res) => {
	const { noteId } = req.params;
	try {
		await notesService.archiveNote(noteId);
		return res.sendStatus(204);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			statusCode: 400,
			statusText: "Error",
		});
	}
};

exports.updateNote = async (req, res) => {
	const { noteId } = req.params;
	const { userId } = req.query;
	const { title, content, categories } = req.body;
	try {
		await notesService.updateNote({
			userId,
			noteId,
			title,
			content,
			categories,
		});
		return res.sendStatus(204);
	} catch (error) {
		if (error.statusCode) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				statusText: error.statusText,
			});
		}
		return res.status(400).json({
			statusCode: 400,
			statusText: "Error",
		});
	}
};

exports.deleteNote = async (req, res) => {
	const { noteId } = req.params;
	try {
		await notesService.deleteNote(noteId);
		return res.sendStatus(204);
	} catch (error) {
		console.log(error);
		if (error.statusCode) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				statusText: error.statusText,
			});
		}
		return res.status(400).json({
			statusCode: 400,
			statusText: "Error",
		});
	}
};
