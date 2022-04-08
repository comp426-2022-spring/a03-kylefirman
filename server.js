//require express and minimist
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args["port"]
const portID = args.port || process.env.PORT || 5000;

//server backend
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', portID))
});

app.get('/app/', (req, res) => {
      res.statusCode = 200;
      res.end(res.statusCode + " OK");
});

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

app.get('/app/flip/', (req, res) => {
  const flip = coinFlip()
	res.status(200).json({"flip" : flip})
});

app.get('/app/flips/:number', (req, res) => {
  const flips = coinFlips(req.params.number)
  res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
});

app.get('/app/flip/call/:call', (req, res) => {
  const guess = flipACoin(req.params.call)
  res.status(200).json({guess})
});

app.use(function(req, res){
  res.end("404 NOT FOUND");
});