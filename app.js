const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());

const WriteJson = (data = {}, path = 'data.json') => {
	data = JSON.stringify(data);
	fs.writeFileSync(path, data);
};
const ReadJson = (path = 'data.json') => {
	let rawdata = fs.readFileSync(path);
	return JSON.parse(rawdata);
};
WriteJson({ play: 0 });
WriteJson({ alert: 0 }, 'dataalert.json');
console.log(ReadJson());

app.use(express.json());
app.get('/api', (_req, res) => {
	try {
		const resp = ReadJson()?.play || 0;
		console.log('get');
		res.send(String(resp));
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});
app.get('/api/alert', (_req, res) => {
	try {
		const resp = ReadJson('dataalert.json')?.alert || 0;
		console.log('get');
		res.send(String(resp));
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

app.post('/api', (req, res) => {
	try {
		const { play } = req.body;
		WriteJson({ play });
		const resp = `Play now is ${play}`;
		console.log(resp);
		res.send(String(resp));
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});
app.post('/api/alert', (req, res) => {
	try {
		const { alert } = req.body;
		WriteJson({ alert }, 'dataalert.json');
		const resp = `Alert now is ${alert}`;
		console.log(resp);
		res.send(String(resp));
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

const port = 8088;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
