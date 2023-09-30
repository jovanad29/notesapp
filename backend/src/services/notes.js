const { Note, Category } = require("../db");

exports.getAll = async (userId) => {
	try {
		const notes = await Note.findAll({
			where: { userId: userId, archived: false },
			include: [{ model: Category, through: { attributes: [] } }],
		});
		return notes;
	} catch (error) {
		throw error;
	}
};

exports.getNote = async (userId, noteId) => {
	try {
		const notes = await Note.findOne({
			where: { userId: userId, id: noteId },
			include: [{ model: Category, through: { attributes: [] } }],
		});
		return notes;
	} catch (error) {
		throw error;
	}
};

exports.getByArchivedValue = async (userId, archived) => {
	try {
		const notes = await Note.findAll({
			where: {
				userId: userId,
				archived: archived,
			},
			include: [{ model: Category, through: { attributes: [] } }],
		});
		return notes;
	} catch (error) {
		throw error;
	}
};

exports.createNote = async (attributes) => {
	const { userId, title, content, categories } = attributes;
	if (!userId || !title || !content) {
		throw {
			statusCode: 400,
			statusText: "All fields are required",
			values: { ...attributes },
		};
	}
	try {
		let newNote = await Note.create({
			userId: userId,
			title: title,
			content: content,
		});
		if (categories.length) {
			categories.forEach(async (categoryName) => {
				const [category, created] = await Category.findOrCreate({
					where: {
						name: categoryName,
						userId: userId,
					},
				});
				await newNote.addCategory(category);
			});
		}
		return await Note.findByPk(newNote.id, {
			include: [{ model: Category, through: { attributes: [] } }],
		});
	} catch (error) {
		throw error;
	}
};

exports.archiveNote = async (noteId) => {
	try {
		const note = await Note.findByPk(noteId);
		note.archived = !note.archived;
		await note.save();
		return true;
	} catch (error) {
		throw error;
	}
};

exports.updateNote = async (attributes) => {
	const { userId, noteId, title, content, categories } = attributes;
	const note = await Note.findOne({
		where: { id: noteId, userId: userId },
	});
	if (!note) throw { statusCode: 404, statusText: "Note not found" };
	try {
		note.title = title;
		note.content = content;
		const instanceNewCategories = [];
		for (const categoryName of categories) {
			const [category, created] = await Category.findOrCreate({
				where: {
					name: categoryName,
					userId: userId,
				},
			});
			instanceNewCategories.push(category);
		}
		await note.setCategories(instanceNewCategories);
		await note.save();
		return true;
	} catch (error) {
		throw error;
	}
};

exports.deleteNote = async (noteId) => {
	try {
		const note = await Note.findByPk(noteId);
		if (!note) throw { statusCode: 404, statusText: "Note not found" };
		const categories = await note.getCategories();
		await note.destroy();
		categories.forEach(async (c) => {
			// si la categoría solo está asociada a esta nota, se elimina
			const count = await c.countNotes();
			if (count < 1) await c.destroy();
		});
		return true;
	} catch (error) {
		throw error;
	}
};
