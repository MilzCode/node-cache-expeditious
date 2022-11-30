const express = require('express');
const { cacheInit } = require('./middlewares/cacheExpeditious');
const app = express();

app.get('/', cacheInit, (_req, res) => {
	try {
		setTimeout(() => {
			res.json({
				msg: 'Hola mundo',
			});
		}, 4000);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
