'use strict';

const assert = require('assert');
const RSA = require('../src/rsa');

describe('RSA', () => {

  it('Should correctly encrypt "SUZANNE"', () => {
    const privateKey = RSA.PrivateKey(3, 33);
    const text = privateKey.encrypt("SUZANNE");

    assert.equal(text[0], 28);
    assert.equal(text[1], 21);
    assert.equal(text[2], 20);
    assert.equal(text[3], 1);
    assert.equal(text[4], 5);
    assert.equal(text[5], 5);
    assert.equal(text[6], 26);
  });

  it('Should correctly decrypt "SUZANNE"', () => {
    const privateKey = RSA.PrivateKey(3, 33);
    const encrypted = privateKey.encrypt("SUZANNE");

    const publicKey = RSA.PublicKey(7, 33);
    const text = publicKey.decrypt(encrypted);

    assert.equal(text, "SUZANNE");
  });

  it('Should generate (e=3, d=7, n=33) rsa keys', () => {
    const rsa = RSA.GenerateKey(1, 4);

    assert.equal(rsa.publicKey.getE(), 7);
    assert.equal(rsa.publicKey.getN(), 33);

    assert.equal(rsa.privateKey.getD(), 3);
    assert.equal(rsa.privateKey.getN(), 33);
  });

  it('Should generate keys  (e=3, d=7, n=33) that correctly encrypt and decrypt "SUZANNE"', () => {
    const rsa = RSA.GenerateKey(1, 4);
    const encrypted = rsa.privateKey.encrypt("SUZANNE");
    const text = rsa.publicKey.decrypt(encrypted);

    assert.equal(text, "SUZANNE");
  });

  it('Should generate random key that correctly encrypt and decrypt "SUZANNE"', () => {
    for(let i = 0; i < 100; i++) {
      const rsa = RSA.GenerateKey();
      const encrypted = rsa.privateKey.encrypt("SUZANNE");
      const text = rsa.publicKey.decrypt(encrypted);

      assert.equal(text, "SUZANNE");
    }
  });

  it('Should generate random key that correctly encrypt and decrypt MD5 checksum of "KINO"(5225dc492f4755a91d4e76f60f110e5f)', () => {
    for(let i = 0; i < 100; i++) {
      const rsa = RSA.GenerateKey();
      const encrypted = rsa.privateKey.encrypt("5225dc492f4755a91d4e76f60f110e5f");
      const text = rsa.publicKey.decrypt(encrypted);

      assert.equal(text, "5225dc492f4755a91d4e76f60f110e5f");
    }
  });
});
