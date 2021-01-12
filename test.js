
str = 'ahoooooj fer 123'
let e = Buffer.from(str, 'binary').toString('base64')
let d = Buffer.from(e, 'base64').toString('binary')
console.log(d)

var baseString = 'my-name-1';

var encodedString = window.btoa( baseString ); // returns "bXktbmFtZS0x"

var decodedString = window.atob( encodedString );  // returns "my-name-1"

console.log(decodedString)