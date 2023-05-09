"use strict";

const axios = require("axios");
const fsP = require("fs/promises");
const argv = process.argv;

//TODO: refactor contents
async function cat(path) {
  try {
    const contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

//TODO: refactor resp
async function webCat(URL) {
  try {
    const resp = await axios.get(URL);
    console.log(resp.data.slice(0, 80));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

//TODO: ternary
if (argv[2].startsWith("http")) {
  webCat(argv[2]);
} else {
  cat(argv[2]);
}