const categoryService = require("../services/categories");

exports.getAll = async (req, res) => {
	const { userId } = req.query;
	try {
		const categories = await categoryService.getAll(userId);
		return res
			.status(200)
			.json({ statusCode: 200, statusText: "OK", result: categories });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};
