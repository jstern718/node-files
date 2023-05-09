"use strict";

const fsP = require('fs/promises');
const argv = process.argv;

async function cat(path) {
  let contents;

  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(contents);
}

cat(argv[2]);