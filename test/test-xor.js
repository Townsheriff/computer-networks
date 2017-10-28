'use strict';

const assert = require('assert');
const xor = require('./../src/xor');

describe('XOR', () => {
  it('Should return 1 when 0 and 1 passed', () => {
    assert.strictEqual(1, xor(0, 1));
  });

  it('Should return 1 when 1 and 0 passed', () => {
    assert.strictEqual(1, xor(1, 0));
  });

  it('Should return 0 when 1 and 1 passed', () => {
    assert.strictEqual(0, xor(1, 1));
  });

  it('Should return 0 when 0 and 0 passed', () => {
    assert.strictEqual(0, xor(0, 0));
  });

  it('Should return [1, 1] when [0, 1] and [1, 0] passed', () => {
    assert.deepStrictEqual([1, 1], xor([0, 1], [1, 0]));
  });

  it('Should return [1, 1] when [1, 0] and [0, 1] passed', () => {
    assert.deepStrictEqual([1, 1], xor([1, 0], [0, 1]));
  });

  it('Should return [0, 0] when [1, 1] and [1, 1] passed', () => {
    assert.deepStrictEqual([0, 0], xor([1, 1], [1, 1]));
  });

  it('Should return [1, 1] when [0, 0] and [0, 0] passed', () => {
    assert.deepStrictEqual([0, 0], xor([0, 0], [0, 0]));
  });

  it('Should return [0, 1, 1, 1, 1, 1] when [1, 1, 0, 0, 1, 0] and [1, 0, 1, 1, 0, 1] passed', () => {
    assert.deepStrictEqual([0, 1, 1, 1, 1, 1], xor([1, 1, 0, 0, 1, 0], [1, 0, 1, 1, 0, 1]));
  });
});
