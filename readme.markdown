# binaryEncoderRing

Encode strings to binary arrays and back again

# example

```
var binaryEncoderRing = require('binaryEncoderRing');

var ring = new binaryEncoderRing();

var sentenceLong = "The infinite monkey theorem states that a monkey hitting keys at random on a typewriter keyboard for an infinite amount of time will almost surely type a given text, such as the complete works of William Shakespeare."

var sentenceSmall = "bEeP bOoP";

var target = ring.encode(sentenceSmall);
console.log(ring.decode(target));

var targetLong = ring.encode(sentenceLong);
console.log(ring.decode(target));

```

# details

useful if you're testing [binary GA's](https://github.com/GMTurbo/canonical-ga)

# scripts

## test

runs the example test.

# methods

``` js
var binaryEncoderRing = require('binaryEncoderRing');
```

## var ring = new binaryEncoderRing();

Create a new instance of a ring.

## ring.encode(string)
returns an binary representation of the input string.

## ring.decode(binaryArr)
returns a string represenation of the binary array

# install

With [npm](https://npmjs.org) do:

```
npm install binaryEncoderRing
```
to get the library.

# license

MIT