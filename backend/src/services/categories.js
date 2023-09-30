const { Category } = require("../db");

exports.getAll = async (userId) => {
	try {
		const categories = await Category.findAll({
			where: { userId: userId },
		});
		return categories;
	} catch (error) {
		throw error;
	}
};
