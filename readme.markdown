# binaryEncoderRing
[![NPM version](https://badge.fury.io/js/binary-encoder-ring.svg)](http://badge.fury.io/js/binary-encoder-ring)

Encode strings to binary arrays and back again

# example

```
var binaryEncoderRing = require('binary-encoder-ring');
var fs = require('fs');

var ring = new binaryEncoderRing();

var sentenceLong = "The infinite monkey theorem states that a monkey hitting keys at random on a typewriter keyboard for an infinite amount of time will almost surely type a given text, such as the complete works of William Shakespeare."

var sentenceSmall = "bEeP bOoP";

var target = ring.encode(sentenceSmall);
console.log(ring.decode(target));

var targetLong = ring.encode(sentenceLong);
console.log(ring.decode(target));

fs.createReadStream('test.txt').pipe(ring.encodeStream()).pipe(ring.decodeStream()).pipe(process.stdout);


```

# piping example

calling binaryEncoderRing.js with `-p` preps the program to encode data for process.stdin

calling binaryEncoderRing.js with `-pd` preps the program to decode data for process.stdin

```
echo 'anyong!' | node binaryEncoderRing.js -p
1011001 1010111 110101 110101 1100010 110010 110101 1101110 1001001 1010001 1101111 111101

echo 'anyong!' | node binaryEncoderRing.js -p | node binaryEncoderRing.js -pd
anyong!


```

# details

useful if you're testing [binary GA's](https://github.com/GMTurbo/canonical-ga)

# scripts

## test

runs the example test.

# methods

```
var binaryEncoderRing = require('binary-encoder-ring');
```

## var ring = new binaryEncoderRing();

Create a new instance of a ring.

## ring.encode(string)
returns an binary representation of the input string.

## ring.decode(binaryArr)
returns a string represenation of the binary array

## ring.encodeStream()
create an encoding stream

## ring.decodeStream()
return a decoding stream

# install

With [npm](https://npmjs.org) do:

```
npm install binary-encoder-ring
```
to get the library.

# license

MIT