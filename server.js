//irequire express and then minimist splicing
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


//Coin Functions because importing them wouldnt work 
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


//rest of API endpoints
app.get('/app/flip/', (req, res) => {
  const flip = coinFlip()
	res.status(200).json({"flip" : flip})
});

app.get('/app/flips/:number', (req, res) => {
  const flips = coinFlips(req.params.number)
  res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
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