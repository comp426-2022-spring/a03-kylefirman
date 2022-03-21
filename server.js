// Importing Functions
import { coinFlip,coinFlips,countFlips,flipACoin } from './coin.mjs'
import minimist from 'minimist';
import express from 'express';

const args = minimist(process.argv.slice(2));
args['port'];
const port = args.port ||process.env.port|| 5000;

// Require Express.js
const express = require('express')
const app = express()

// Start an app server
const server = app.listen(PortID, () => {
    console.log('App listening on port %PORT%'.replace ('%PORT%',PortID))
})

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
})

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

// Work to do, req.params.number references the number variable
app.get('/app/flips/:number', (req, res) => {
	const flips = manyflips(req.params.number)
	//Other
	//expressions
	//go
	//here
});

app.get('/app/flip/', (req, res) => {
    result = coinFlip();
    res.status(200).json({ 'flip' : result});
});

app.get('/app/flips/:number', (req, res) => {
    n = req.params.number
    rawResults = coinFlips(n)
    summaryResults = countFlips(rawResults)
    res.status(200).json({ 'raw' : rawResults, 'summary' : summaryResults});
})

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json({ 'result' : flipACoin('tails')});
})

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json({ 'result' : flipACoin('heads')});
})
