'use strict';

const xor = require('./xor');

// ERROR CORRECTION CODES
// HAMMING BINARY BLOCK CODE (7,4)
const codewords = [
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 1],
  [0, 1, 0, 0, 1, 0, 1],
  [0, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 1, 1],
  [0, 1, 0, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 0],
  [1, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1]
];

/**
 * internally used method for finding difference between two codewords
 * @param codeword {Array<number>} - left side
 * @param data {Array<number>} - right side
 * @return {number} - how much bits two codewords differ
 * @private
 */
const offset = (codeword, data) => {
  return xor(codeword, data).reduce((diff, value) => {
    return value ? diff + 1 : diff;
  }, 0);
};

/**
 * accepts 4-bit data and outputs a codeword
 * @param data {Array<number>} - 4-bit data
 * @return {Array<number>} - 7-bit codeword
 */
const encode = data => {
  return codewords.find(codeword => {
    return offset(codeword.slice(0, 4), data) === 0;
  });
};

/**
 * decodes 7-bit codeword to 4-bit data
 * finds closest codeword if there is a mistake
 * will produce incorrect output when 2 or more bit errors are present
 * @param data {Array<number>} - 7-bit codeword
 * @return {Array<number>} - 4-bit data
 */
const decode = data => {
  const closest = codewords.map(codeword => {
    return {
      codeword: codeword,
      error: offset(codeword, data),
    };
  }).reduce((closest, current) => {
    if (!closest) {
      return current;
    }

    if (current.error < closest.error) {
      return current;
    }

    return closest;
  }, null);

  return closest.codeword.slice(0, 4);
};

/**
 * checks if there is an error in code word
 * will only show correctly one and two bit errors
 * @param data {Array<number>} - 7-bit
 * @return {boolean} - true if there is an error false otherwise
 */
const error = data => {
  return !!codewords.map(codeword => {
    return offset(codeword, data);
  }).reduce((closest, current) => {
    return current < closest ? current : closest;
  }, Number.MAX_SAFE_INTEGER);
};

module.exports = {
  encode: encode,
  decode: decode,
  error: error
};
