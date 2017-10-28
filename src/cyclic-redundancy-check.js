'use strict';

const xor = require('./xor');

/**
 * creates a checksum for specific frame (data) and appends it
 * also used for checking checksum, when returns array with zeros then no errors present
 * @param generator {Array<number>} - function applied to create checksum
 * @param frame {Array<number>} - data for which to create checksum
 * @return {Array<number>} - frame and checksum
 */
module.exports = (generator, frame) => {
  // create copies of arrays
  generator = generator.slice();
  frame = frame.slice();

  // appends zeros at the end of frame
  for (let i = 0; i < generator.length - 1; i++) {
    frame.push(0);
  }

  for (let i = 0; i + generator.length <= frame.length; i++) {
    // cannot be divided with XOR when divisor is smaller than divider
    if (frame[i] === 0) {
      continue;
    }

    // finds correct frame part for XOR
    const divisor = frame.slice(i, i + generator.length);
    // divided with generator function
    const result = xor(divisor, generator);

    // results put back in frame array
    for (let j = 0; j < generator.length; j++) {
      frame[i + j] = result[j];
    }
  }

  // finds the generator length - 1 last digits which are check sum
  return frame.slice(frame.length - generator.length + 1, frame.length);
};
