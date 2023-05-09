"use strict";

const axios = require("axios");
const fsP = require("fs/promises");
const argv = process.argv;

async function cat(path) {
  let contents;

  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(contents);
}

async function webCat(URL) {
  let resp;

  try {
    resp = await axios.get(URL);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(resp.data.slice(0, 80));
}

async function writeOutput(path, data, encoding){
  try{
    fsP.writeFile(path, data, encoding);
  } catch(err){
      console.error(err);
      process.exit(1);
  }
}

if (argv[2] === "--out"){
  writeOutput(argv[3], argv[4], "utf-8");
}
else{
  argv[2].startsWith("http") ? webCat(argv[2]) : cat(argv[2])
}