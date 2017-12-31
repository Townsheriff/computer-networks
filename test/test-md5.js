'use strict';

const assert = require('assert');
const md5 = require('md5');

describe('MD5', () => {
  it('Checksum for string "KINO"', () => {
    assert.equal("5225dc492f4755a91d4e76f60f110e5f", md5("KINO"));
  });
});
