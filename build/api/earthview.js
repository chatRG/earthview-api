'use strict';

var express = require('express');
var fs = require('fs');
var fetch = require('node-fetch');

var router = express.Router();
var base = 'https://earthview.withgoogle.com';

var endpoint = '/_api/dunfield-united-kingdom-5686.json';
var output = [];
var visited = [];
// var count = 0;

function doTask(url) {
	return fetch(url).then(function (response) {
		return response.json();
	}).then(function (json) {
		console.log(json.id);
		// counter for n number of JSON object
		/*count++;
  if(count > 5) {
  	return output;
  }*/
		if (json.id in visited) {
			console.log('Exiting with ' + output.length + ' data scraped...');
			return output;
		}
		visited.push(json.id);
		output.push(json);
		endpoint = json.nextApi;
		return doTask(base + endpoint);
	}).catch(function (err) {
		//console.log('Error: ' + err);
	});
}

router.get('/api/earthview', function (req, res) {
	doTask(base + endpoint).then(function (result) {
		wFile(result);
		res.send(result.length + ' objects scraped!');
		res.end();
	});
});

var wFile = function wFile(result) {
	fs.writeFile('output.json', JSON.stringify(result, null, 4), function (err) {
		console.log('File successfully written! - Check the project directory for the output.json file');
	});
};

module.exports = router;