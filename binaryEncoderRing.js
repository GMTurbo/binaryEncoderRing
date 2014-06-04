
var through = require('through');
var argv = require('minimist')(process.argv.slice(2));

var binaryEncoderRing = function(){
  
  this.binaryRep = [];
  this.result = null;
  
  this.encode = function(stringToEncode){
    return encode(stringToEncode);
  };
  
  function encode(stringToEncode){
    
    var base64 = new Buffer(stringToEncode).toString('base64')
    
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
    
    var base64 = base64.toString('base64')
    
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
  
  function decode(stringToEncode){
    
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
    
    //console.dir(this.binaryRep);
    var ret = [];
    var count = 0;
    for(var i = 0 ; i < this.binaryRep.length ; i++){
      ret.push(String.fromCharCode(parseInt(this.binaryRep[i].join(''), 2)))
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

var binaryStream = new binaryEncoderRing();

var onData = function(data){
  if(argv.d)
    this.queue(binaryStream.decodeFromBuffer(data));
  else
    this.queue(binaryStream.encodeFromBuffer(data));
};

var onEnd = function(data){
  
  if(!data) return;
  
  if(argv.d)
    this.queue(binaryStream.decodeFromBuffer(data));
  else
    this.queue(binaryStream.encodeFromBuffer(data));
};

var tr = through(onData, onEnd);

process.stdin.pipe(tr).pipe(process.stdout);
  
module.exports = binaryEncoderRing;