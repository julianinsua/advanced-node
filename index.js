process.env.UV_THREAD_POOL = 1
const crypto = require("crypto")
const cluster = require("cluster");
const express = require("express");
const app = express();

if (cluster.isMaster) {
	// Creating 4 instances of our server
	const clusterCount = process.env.CLUSTER_COUNT || 1;
	for (let i = 0; i < clusterCount; i++) {
		cluster.fork();
	}
} else {
	app.get("/", (req, res, next) => {
        // Make a hash to simulate hard work
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send("Hi there!");
        })
	});

	app.get("/fast", (req, res) => {
		res.send("That was fast");
	});

	app.listen(8080);
}
