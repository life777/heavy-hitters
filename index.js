const { Readable } = require("stream");
const calc = require("./src/calc");

const stream = new Readable();

const p = calc(stream, 2);

// just an experiment
[
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "green",
    "green",
].forEach((type) => {
    stream.push(type);
});

stream.push(null);

p.then((list) => {
    console.log(list.join(", "));
});