
var binaryEncoderRing = require('../binaryEncoderRing');

var ring = new binaryEncoderRing();

var sentenceLong = "The infinite monkey theorem states that a monkey hitting keys at random on a typewriter keyboard for an infinite amount of time will almost surely type a given text, such as the complete works of William Shakespeare.";

var sentenceSmall = "beEp bOoP";

var target = ring.encode(sentenceSmall);

//console.log(target);

console.log(ring.decode(target));

var targetLong = ring.encode(sentenceLong);

//console.log(targetLong);

console.log(ring.decode(targetLong));
