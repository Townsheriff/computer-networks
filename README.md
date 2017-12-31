# Computer Networks


### Cyclic Redundancy Checks (CRC)

Implementation can be found: `src/cyclic-redundancy-check.js`
Test scenarios can be found: `test/test-cyclic-redundancy-check.js`

### Error Correction Codes (ECC)

Used Hamming Code (7,4) codewords.

Implementation can be found: `src/error-correction-codes.js`
Test scenarios can be found `test/test-error-correction-codes.js`

### RSA Signed Message

Used node package [MD5](https://www.npmjs.com/package/md5).

Finding prime numbers: [prime-numbers.js](../master/src/prime-numbers.js)

Generating, encrypting, decrypting: [rsa.js](../master/src/rsa.js)

Tests scenarios for Signed RSA Message: [test-message-signing.js](../master/test/test-message-signing.js)

### Running

Steps tested with MacOS.
Running unit tests wont work on windows CMD, but should work in [Windows Bash](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/).

1. Install [NodeJS](https://nodejs.org/en/download/)
2. Install project dependencies: `npm install`
3. Run unit tests: `npm run test` (Mac/Linux)


### Resources

* [MD5 JS Implementation](https://code.google.com/archive/p/crypto-js/)
