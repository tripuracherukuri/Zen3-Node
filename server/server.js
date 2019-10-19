var express = require("express");
const path = require('path')
const fs = require('fs') 
const envFile = require('envfile')
var cors = require('cors');
var app = express();
app.use(cors());
const port = 3005;

app.get("/getEnvVariable/:pname", (req, res) => {
  const filepath = path.resolve(__dirname, `${req.params.pname}/.env`)
  if(filepath){
    res.json(envFile.parseFileSync(filepath))
  }
  else {
    res.json({"status":"Something went wrong get env variables"})
  }
});

app.get("/addEnvVariable/:pname/:key/:value", (req, res) => {
  const filepath = path.resolve(__dirname, `${req.params.pname}/.env`)
  if(filepath){
    let processFile = envFile.parseFileSync(filepath);
    processFile[req.params.key] = req.params.value;
    fs.writeFileSync(filepath, envFile.stringifySync(processFile)); 
    envFile.stringifySync(processFile)
    res.json(envFile.parseFileSync(filepath));
  }
  else {
    res.json({"status":"Something went wrong set env variables"})
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port} `);
});

