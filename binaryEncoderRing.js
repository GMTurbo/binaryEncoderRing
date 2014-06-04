var through = require('through');
var argv = require('minimist')(process.argv.slice(2));

var stream = function(type){
  
  var ber = new binaryEncoderRing();
  
  var tr = null;
  
  if(type == 'encode'){
    
    tr = through(function(data){
      this.queue(ber.encodeFromBuffer(data));
    });
  }else{
    tr = through(function(data){
      this.queue(ber.decodeFromBuffer(data));
    });
  }
  
  return tr;
}

var binaryEncoderRing = function(){
  
  this.binaryRep = [];
  this.result = null;

  this.encodeStream = function(){
    return new stream('encode');
  };
  
  this.decodeStream = function(){
    return new stream('decode');
  };
  
  this.encode = function(stringToEncode){
    return encode(stringToEncode);
  };
  
  function encode(stringToEncode){
    
    var base64 = new Buffer(stringToEncode).toString('base64');
    
    this.binaryRep = [];

    for(var i = 0; i < base64.length ; i++){
      this.binaryRep.push(base64[i].charCodeAt(0).toString(2));
    }
    
    tar = this.binaryRep.join("");
    this.result = [];
    
    for(var i = 0 ; i < tar.length; i++){
      this.result[i] = parseInt(tar[i],2);
    }
    
    return this.result;
  };
  
  this.encodeFromBuffer = function(base64){
    
    base64 = base64.toString('base64');
    
    this.binaryRep = [];

    for(var i = 0; i < base64.length ; i++){
      this.binaryRep.push(base64[i].charCodeAt(0).toString(2));
    }
    
    tar = this.binaryRep.join(" ");
    
    return tar;
  };

  this.decode = function(binaryArrToDecode){
    return decode(binaryArrToDecode);
  };
  
  function decode(binaryArrToDecode){
    
    var ret = [];
    var count = 0;
    for(var i = 0 ; i < this.binaryRep.length ; i++){
      var row = [];
      for(var j = 0 ; j < this.binaryRep[i].length; j++){
        row.push(binaryArrToDecode[count++]);
      }
      ret.push(String.fromCharCode(parseInt(row.join(''), 2)))
    }
    return new Buffer(ret.join(''), 'base64').toString('ascii');
    
  };
  
  this.decodeFromBuffer = function(data){
    
    var binaryArrToDecode = data.toString('ascii');
    
    this.binaryRep = split(binaryArrToDecode, ' ');

    var ret = [];
    var count = 0;
    for(var i = 0 ; i < this.binaryRep.length ; i++){
      ret.push(String.fromCharCode(parseInt(this.binaryRep[i].join(''), 2)));
    }
    return new Buffer(ret.join(''), 'base64').toString('ascii');
    
  };
  
  function split(a, n) {
    var len = a.length,out = [], buff = [];
    for(var i = 0; i < a.length; i++){
      if(a[i] != ' '){
        buff.push(a[i]);
      }else{
        out.push(buff.slice());
        buff = [];
      }
    }
    return out;
  }
};

if(argv.p){
  if(argv.d)
    process.stdin.pipe(new stream('decode')).pipe(process.stdout);
  else
    process.stdin.pipe(new stream('encode')).pipe(process.stdout);
}

module.exports = binaryEncoderRing;