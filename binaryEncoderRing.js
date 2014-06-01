var binaryEncoderRing = function(){
  
  this.binaryRep = [];
  this.result = null;
  
  this.encode = function(stringToEncode){
    
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
  
  this.decode = function(binaryArrToDecode){
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
  }
  
};