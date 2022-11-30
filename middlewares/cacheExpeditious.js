const expeditious = require('express-expeditious');

const defaultOptions = {
	namespace: 'expresscache',
	defaultTtl: '1 minute',
	statusCodeExpires: {
		404: '5 minutes',
		500: 0, // 1 minute in milliseconds,
	},
	// Redis config
	// engine: require('expeditious-engine-redis')({
	// 	host: 'localhost',
	// 	port: 6379,
	// }),
};

const cacheInit = expeditious(defaultOptions);

module.exports = { cacheInit };
