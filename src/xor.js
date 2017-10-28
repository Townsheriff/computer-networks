'use strict';

const assert = require('assert');

const xor = (a, b) => {
  if (a !== 0 && a !== 1) {
    throw new Error('Invalid element type for a');
  }

  if (b !== 0 && b !== 1) {
    throw new Error('Invalid element type for b');
  }

  return Number((a || b) && !(a && b));
};

const xorVector = (a, b) => {
  if (a.length !== b.length) {
    throw new Error('A and B vectors are not of equal sizes');
  }

  return a.map((val, index) => {
    return xor(val, b[index]);
  });
};

module.exports = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return xor(a, b);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return xorVector(a, b);
  }

  throw new Error('Invalid argument a and b types');
};

