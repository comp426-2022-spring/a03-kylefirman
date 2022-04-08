//if i even add a comment
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))

args["port"]

const port = args.port || process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

app.get('/app/', (req, res) => {
      res.statusCode = 200;
      res.end(res.statusCode + "OK");
});

function coinFlip() {
    if (Math.random() >= 0.5) {
      return "heads"
    } else {
      return "tails"
    }
}
  
function coinFlips(flips) {
    const values = []
    for (let i = 0; i < flips; i++) {
      values[i] = coinFlip()
    }
    return values
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
  return {"heads": headcount, "tails": tailscount};
}
  
function flipACoin(call) {
  var flip = coinFlip()
  if (call == flip) {
    var result = "win"
  } else {
    var result = "lose"
  }
  return {"call": call, "flip": flip, "result": result};
}

app.get('/app/flip/', (req, res) => {
  const flip = coinFlip()
	res.status(200).json({"flip" : flip})
});

app.get('/app/flips/:number', (req, res) => {
  const flips = coinFlips(req.params.number)
  const counted = countFlips(flips)
  res.status(200).json({"raw" : flips, "summary" : counted})
});

app.get('/app/flip/call/:call', (req, res) => {
  const called = flipACoin(req.params.call)
  res.status(200).json({called})
});

app.use(function(req, res){
  res.statusCode = 404;
      res.statusMessage = 'NOT FOUND';
      res.end(res.statusCode+ ' ' +res.statusMessage);
      res.type("text/plain");
});