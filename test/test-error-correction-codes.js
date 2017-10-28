'use strict';

const assert = require('assert');
const ecc = require('./../src/error-correction-codes');


describe('Error Correction (Hamming) Codes', () => {

  it('Should find correct code word for [0,0,0,0]', () => {
    assert.deepStrictEqual([0, 0, 0, 0, 0, 0, 0], ecc.encode([0, 0, 0, 0]));
  });

  it('Should find correct code word for [1,1,1,1]', () => {
    assert.deepStrictEqual([1, 1, 1, 1, 1, 1, 1], ecc.encode([1, 1, 1, 1]));
  });

  it('Should find correct code word for [0, 1, 0, 1]', () => {
    assert.deepStrictEqual([0, 1, 0, 1, 1, 1, 0], ecc.encode([0, 1, 0, 1]));
  });

  it('Should correctly decode with no mistakes code [0,0,0,0]', () => {
    assert.deepStrictEqual([0, 0, 0, 0], ecc.decode([0, 0, 0, 0, 0, 0, 0]));
  });

  it('Should correctly decode with no mistakes code [1,1,1,1]', () => {
    assert.deepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 1, 1, 1, 1, 1]));
  });

  it('Should correctly decode with no mistakes code [0,1,0,1]', () => {
    assert.deepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 0, 1, 1, 1, 0]));
  });

  it('Should correctly decode with no one mistake code [0,1,0,1]', () => {
    assert.deepStrictEqual([0, 1, 0, 1], ecc.decode([1, 1, 0, 1, 1, 1, 0]));
  });

  it('Should correctly decode with no one mistake code [0,1,0,1]', () => {
    assert.deepStrictEqual([0, 1, 0, 1], ecc.decode([1, 1, 0, 1, 1, 1, 0]));
    assert.deepStrictEqual([0, 1, 0, 1], ecc.decode([0, 0, 0, 1, 1, 1, 0]));
    assert.deepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 1, 1, 1, 1, 0]));
    assert.deepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 0, 0, 1, 1, 0]));
    assert.deepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 0, 1, 0, 1, 0]));
    assert.deepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 0, 1, 1, 0, 0]));
    assert.deepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 0, 1, 1, 1, 1]));
  });

  it('Should correctly decode with no one mistake code [1,1,1,1]', () => {
    assert.deepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 1, 1, 1, 1, 0]));
    assert.deepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 1, 1, 1, 0, 1]));
    assert.deepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 1, 1, 0, 1, 1]));
    assert.deepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 1, 0, 1, 1, 1]));
    assert.deepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 0, 1, 1, 1, 1]));
    assert.deepStrictEqual([1, 1, 1, 1], ecc.decode([1, 0, 1, 1, 1, 1, 1]));
    assert.deepStrictEqual([1, 1, 1, 1], ecc.decode([0, 1, 1, 1, 1, 1, 1]));
  });

  it('Should incorrectly find two mistake data [1,1,1,1]', () => {
    assert.notDeepStrictEqual([1, 1, 1, 1], ecc.decode([0, 0, 1, 1, 1, 1, 1]));
    assert.notDeepStrictEqual([1, 1, 1, 1], ecc.decode([1, 0, 0, 1, 1, 1, 1]));
    assert.notDeepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 0, 0, 1, 1, 1]));
    assert.notDeepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 1, 0, 0, 1, 1]));
    assert.notDeepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 1, 1, 0, 0, 1]));
    assert.notDeepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 1, 1, 1, 0, 0]));
    assert.notDeepStrictEqual([1, 1, 1, 1], ecc.decode([0, 1, 1, 1, 0, 1, 1]));
    assert.notDeepStrictEqual([1, 1, 1, 1], ecc.decode([1, 1, 0, 1, 1, 1, 0]));
  });

  it('Should incorrectly find two mistake data [0,0,0,0]', () => {
    assert.notDeepStrictEqual([0, 0, 0, 0], ecc.decode([1, 1, 0, 0, 0, 0, 0]));
    assert.notDeepStrictEqual([0, 0, 0, 0], ecc.decode([0, 1, 1, 0, 0, 0, 0]));
    assert.notDeepStrictEqual([0, 0, 0, 0], ecc.decode([0, 0, 1, 1, 0, 0, 0]));
    assert.notDeepStrictEqual([0, 0, 0, 0], ecc.decode([0, 0, 0, 1, 1, 0, 0]));
    assert.notDeepStrictEqual([0, 0, 0, 0], ecc.decode([0, 0, 0, 0, 1, 1, 0]));
    assert.notDeepStrictEqual([0, 0, 0, 0], ecc.decode([0, 0, 0, 0, 0, 1, 1]));
    assert.notDeepStrictEqual([0, 0, 0, 0], ecc.decode([1, 0, 0, 0, 1, 0, 0]));
    assert.notDeepStrictEqual([0, 0, 0, 0], ecc.decode([0, 0, 1, 0, 0, 0, 1]));
  });

  it('Should incorrectly find two mistake data [0,1,0,1]', () => {
    assert.notDeepStrictEqual([0, 1, 0, 1], ecc.decode([1, 0, 0, 1, 1, 1, 0]));
    assert.notDeepStrictEqual([0, 1, 0, 1], ecc.decode([0, 0, 1, 1, 1, 1, 0]));
    assert.notDeepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 1, 0, 1, 1, 0]));
    assert.notDeepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 0, 0, 0, 1, 0]));
    assert.notDeepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 0, 1, 0, 0, 0]));
    assert.notDeepStrictEqual([0, 1, 0, 1], ecc.decode([0, 1, 0, 1, 1, 0, 1]));
    assert.notDeepStrictEqual([0, 1, 0, 1], ecc.decode([0, 0, 0, 1, 1, 0, 0]));
  });

  it('Should find offset for two mistake data [1,1,1,1]', () => {
    assert.equal(1, ecc.error([0, 0, 1, 1, 1, 1, 1]));
    assert.equal(1, ecc.error([1, 0, 0, 1, 1, 1, 1]));
    assert.equal(1, ecc.error([1, 1, 0, 0, 1, 1, 1]));
    assert.equal(1, ecc.error([1, 1, 1, 0, 0, 1, 1]));
    assert.equal(1, ecc.error([1, 1, 1, 1, 0, 0, 1]));
    assert.equal(1, ecc.error([1, 1, 1, 1, 1, 0, 0]));
    assert.equal(1, ecc.error([0, 1, 1, 1, 0, 1, 1]));
    assert.equal(1, ecc.error([1, 1, 0, 1, 1, 1, 0]));
  });

  it('Should find correct offset for two mistake data [0,0,0,0]', () => {
    assert.equal(1, ecc.error([1, 1, 0, 0, 0, 0, 0]));
    assert.equal(1, ecc.error([0, 1, 1, 0, 0, 0, 0]));
    assert.equal(1, ecc.error([0, 0, 1, 1, 0, 0, 0]));
    assert.equal(1, ecc.error([0, 0, 0, 1, 1, 0, 0]));
    assert.equal(1, ecc.error([0, 0, 0, 0, 1, 1, 0]));
    assert.equal(1, ecc.error([0, 0, 0, 0, 0, 1, 1]));
    assert.equal(1, ecc.error([1, 0, 0, 0, 1, 0, 0]));
    assert.equal(1, ecc.error([0, 0, 1, 0, 0, 0, 1]));
  });

  it('Should find correct offset for two mistake data [0,1,0,1]', () => {
    assert.equal(1, ecc.error([1, 0, 0, 1, 1, 1, 0]));
    assert.equal(1, ecc.error([0, 0, 1, 1, 1, 1, 0]));
    assert.equal(1, ecc.error([0, 1, 1, 0, 1, 1, 0]));
    assert.equal(1, ecc.error([0, 1, 0, 0, 0, 1, 0]));
    assert.equal(1, ecc.error([0, 1, 0, 1, 0, 0, 0]));
    assert.equal(1, ecc.error([0, 1, 0, 1, 1, 0, 1]));
    assert.equal(1, ecc.error([0, 0, 0, 1, 1, 0, 0]));
  });
});
