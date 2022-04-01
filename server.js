// Importing Functions
//import { coinFlip,coinFlips,countFlips,flipACoin } from './coin.mjs'
import minimist from 'minimist';
import express from 'express';

const minimist = require('minimist')
const args = minimist(process.argv.slice(2))
args["port"]
const PortID = args.port || process.env.port || 5000

// Require Express.js
const express = require('express')
const app = express()

// Start an app server
const server = app.listen(PortID, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', PortID))
});

//Coin functions
function coinFlip() {
    let flipped = Math.floor(Math.random() * 2)
    if (flipped == 0) {
      return "heads";
    } else {
      return "tails";
    }
}

function coinFlips(flips) {
    let results = [flips];
    for (let i = 0; i < flips; i++) {
      results[i] = coinFlip();
    }
    return results;
}

function countFlips(array) {
    let headcount = 0;
    let tailscount = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        headcount++;
      } else {
        tailscount++;
      }
    }
    let FlipResults = ["heads " + headcount, "tails " + tailscount];
    return FlipResults;
}

function flipACoin(call) {
    let actual = coinFlip();
    if (call.equals(actual)) {
      let flipGame = ["call: " + call, "flip: " + actual, "result: win"];
    } else {
      let flipGame = ["call: " + call, "flip: " + actual, "result: lose"];
    }
    return flipGame;
}









// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
})

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.status(200).end("200 OK")
});

app.get('/app/flip/', (req, res) => {
    var result = coinFlip();
    res.status(200).json({ 'flip' : result})
});

app.get('/app/flips/:number', (req, res) => {
	const flips = coinFlips(req.params.number)
	res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json({ 'result' : flipACoin('tails')})
})

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json({ 'result' : flipACoin('heads')})
})





