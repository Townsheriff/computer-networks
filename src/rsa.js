'use strict';

const primes = require('./prime-numbers')();
const offset = -64;

/**
 * More efficient way of calculating: Math.pow(code, power) % mod
 * @param code - char code
 * @param power - d or e
 * @param mod - n
 * @returns reminder (encrypted or decrypted value)
 */
const transform = (code, power, mod) => {
  let value = code;

  for (let j = 0; j < power - 1; j++) {
    value = (value * code) % mod;
  }

  return value;
};

/**
 * Creates object that allows encrypting data
 * @param d
 * @param n
 * @returns {Object} PrivateKey
 * @constructor
 */
const PrivateKey = (d, n) => {

  const encrypt = text => {
    const encrypted = [];

    // iterates each character and applies Math.pow(code, d) % n
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i) + offset;
      const encryptedText = transform(code, d, n);
      encrypted.push(encryptedText);
    }

    // returns an array of encrypted characters
    return encrypted;
  };

  const getD = () => {
    return d;
  };

  const getN = () => {
    return n;
  };

  return {
    encrypt: encrypt,
    getD: getD,
    getN: getN
  };
};

/**
 * Creates object that allows decrypting data
 * @param e
 * @param n
 * @returns {Object} PublicKey
 * @constructor
 */
const PublicKey = (e, n) => {

  const decrypt = encrypted => {
    // iterates through array of encoded char values
    return encrypted.map(code => {
      // Applies Math.pow(code, e) % n
      return transform(code, e, n);
    }).reduce((prev, current) => {
      // concat a list of characters in one string
      return prev + String.fromCharCode(current - offset);
    }, '');
  };

  const getE = () => {
    return e;
  };

  const getN = () => {
    return n;
  };

  return {
    decrypt: decrypt,
    getE: getE,
    getN: getN
  };
};

/**
 *
 * @param primeIndexOne {Integer} (Optional) Index of first prime number for generating key
 * @param primeIndexTwo {Integer} (Optional) Index of second prime number for generating key
 * @returns {Object} public and private RSA keys
 * @constructor
 */
const GenerateKey = (primeIndexOne = -1, primeIndexTwo = -1) => {
  if (primeIndexOne < 0) {
    // randomly selects an prime index (10 - 39)
    // small primes seems to fail
    // for example 3 and 7
    primeIndexOne = Math.floor(Math.random() * 20) + 10;
  }

  if (primeIndexTwo < 0) {
    primeIndexTwo = primeIndexOne;

    // finds a different unique prime index
    while (primeIndexOne === primeIndexTwo) {
      primeIndexTwo = Math.floor(Math.random() * 20) + 10;
    }
  }

  // finds primes with corresponding indexes
  const primeOne = primes.find(primeIndexOne);
  const primeTwo = primes.find(primeIndexTwo);

  const n = primeOne * primeTwo;
  const z = (primeOne - 1) * (primeTwo - 1);
  // finds a prime that is relative to z
  const d = primes.coprime(z);

  let e = 0;
  while ((e * d) % z !== 1) {
    e++;
  }

  return {
    publicKey: PublicKey(e, n),
    privateKey: PrivateKey(d, n)
  };
};

module.exports = {
  GenerateKey: GenerateKey,
  PrivateKey: PrivateKey,
  PublicKey: PublicKey
};
