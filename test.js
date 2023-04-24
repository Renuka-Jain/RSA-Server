var myModule = require('.');
var plaintext = 'hello world!';
console.log("Plaintext: ".concat(plaintext));
var ciphertect = myModule.encrypt(plaintext);
console.log('Ciphertext: ' + ciphertect);
var decrypted = myModule.decrypt(ciphertect);
console.log('Decrypted: ' + decrypted);
if (plaintext === decrypted) {
    console.log('Proof of Correctness: OK');
}
else {
    console.error('Proof of Correctness: FAILED');
}
