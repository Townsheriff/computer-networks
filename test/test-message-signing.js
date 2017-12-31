'use strict';

const assert = require('assert');
const md5 = require('md5');
const RSA = require('../src/rsa');

describe('Signing', () => {
  /**
   * How it works:
   * 1. Sender creates a signature = encrypt(md5(message))
   * message - data needed to be sent
   * md5 - function that calculates a checksum for message
   * encrypt - function that ciphers checksum
   * 2. Sender sends signature with the original message
   * {message: "KINO", signature: "5225dc492f4755a91d4e76f60f110e5f"}
   * 3. Receiver receives the payload
   * 4. Received calculates the checksum from message
   * 5. Receiver deciphers the signature (checksum)
   * 6. Receiver compares deciphered checksum and locally calculated checksum
   * 7. Message is signed by correct user only if received checksum and locally created checksum is the same
   */
  it('Should correctly sign a message "KINO" and ensure it is correct', () => {
    const message = 'KINO';
    // sender calculates the checksum (1)
    const checksum = md5(message);
    assert.equal(checksum, "5225dc492f4755a91d4e76f60f110e5f");

    // creates a random public and private keys
    const rsa = RSA.GenerateKey();
    // sender ciphers the checksum (1)
    const signature = rsa.privateKey.encrypt(checksum);

    // sender sends the payload (2)
    // receiver receives the payload (3)
    const payload = {
      message: message,
      signature: signature
    };

    // receivers calculates checksum from message (4)
    const localChecksum = md5(payload.message);
    // receiver deciphers the signature (5)
    const remoteChecksum = rsa.publicKey.decrypt(payload.signature);
    // receiver compares both checksums (6) (7)
    assert.equal(remoteChecksum, localChecksum);
  });

  it('Should reject signed message with incorrect text', () => {
    const message = 'KINO';
    const checksum = md5(message);
    assert.equal(checksum, "5225dc492f4755a91d4e76f60f110e5f");

    const rsa = RSA.GenerateKey();
    const signature = rsa.privateKey.encrypt(checksum);

    const payload = {
      message: "NOT CORRECT",
      signature: signature
    };

    const localChecksum = md5(payload.message);
    const remoteChecksum = rsa.publicKey.decrypt(payload.signature);
    assert.notEqual(remoteChecksum, localChecksum);
  });

  it('Should reject signed message with incorrect signature', () => {
    const message = 'KINO';
    const checksum = md5(message);
    assert.equal(checksum, "5225dc492f4755a91d4e76f60f110e5f");

    const rsa = RSA.GenerateKey();
    const signature = rsa.privateKey.encrypt("NOT CORRECT");

    const payload = {
      message: message,
      signature: signature
    };

    const localChecksum = md5(payload.message);
    const remoteChecksum = rsa.publicKey.decrypt(payload.signature);
    assert.notEqual(remoteChecksum, localChecksum);
  })
});
