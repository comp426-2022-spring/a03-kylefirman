// Importing Functions
import { coinFlip,coinFlips,countFlips,flipACoin } from './coin.mjs'
import minimist from 'minimist';
import express from 'express';

const minimist = require("minimist")
const args = minimist(process.argv.slice(2))
args["port"]
const port = args.port || process.env.port || 5000

// Require Express.js
const express = require('express')
const app = express()

// Start an app server
const server = app.listen(PortID, () => {
    console.log('App listening on port : ' + PortID)
})

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
})

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.status(200).end("200 OK")
});

app.get('/app/flip/', (req, res) => {
    result = coinFlip();
    res.status(200).json({ 'flip' : result});
});

// Work to do, req.params.number references the number variable
app.get('/app/flips/:number', (req, res) => {
	const flips = coinFlips(req.params.number)
	res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json({ 'result' : flipACoin('tails')});
})

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json({ 'result' : flipACoin('heads')});
})
