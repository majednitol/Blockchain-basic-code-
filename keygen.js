const EC = require('elliptic').ec;
// Create and initialize EC context
var ec = new EC('secp256k1');

// Generate keys
var key = ec.genKeyPair();
const privatekey = key.getPrivate('hex')
const publickey = key.getPublic('hex')
console.log(privatekey,publickey);