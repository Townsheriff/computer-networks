'use strict';

const assert = require('assert');
const getFCS = require('./../src/cyclic-redundancy-check');

describe('Cyclic Redundancy Check', () => {
  // https://www.youtube.com/watch?v=6gbkoFciryA
  it('Should create correct forward check sequence (Youtube video, see comment)', () => {
    const frame = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0];
    const generator = [1, 1, 0, 0, 1, 0];
    assert.deepStrictEqual([0, 1, 0, 0, 0], getFCS(generator, frame));
  });

  it('Should create correct forward check sequence (Tanenbaum 5th edition)', () => {
    const frame = [1, 1, 0, 1, 0, 1, 1, 1, 1, 1];
    const generator = [1, 0, 0, 1, 1];
    assert.deepStrictEqual([0, 0, 1, 0], getFCS(generator, frame));
  });

  it('Should create correct forward check sequence (Homework material)', () => {
    const frame = [1, 1, 0, 1, 0, 1, 1, 0, 1, 1];
    const generator = [1, 0, 0, 1, 1];
    assert.deepStrictEqual([1, 1, 1, 0], getFCS(generator, frame));
  });

  // https://www.youtube.com/watch?v=6gbkoFciryA
  it('Should have all fcs values be zero reapplying FCS function (Youtube video, see comment)', () => {
    const frame = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0];
    const generator = [1, 1, 0, 0, 1, 0];
    const fcs = [0, 1, 0, 0, 0];
    const transmittedFrame = frame.concat(fcs);
    assert.deepStrictEqual([0, 0, 0, 0, 0], getFCS(generator, transmittedFrame));
  });

  it('Should have all fcs values be zero reapplying FCS function (Tanenbaum 5th edition)', () => {
    const frame = [1, 1, 0, 1, 0, 1, 1, 1, 1, 1];
    const generator = [1, 0, 0, 1, 1];
    const fcs = [0, 0, 1, 0];
    const transmittedFrame = frame.concat(fcs);
    assert.deepStrictEqual([0, 0, 0, 0], getFCS(generator, transmittedFrame));
  });

  it('Should have all fcs values be zero reapplying FCS function (Homework material)', () => {
    const frame = [1, 1, 0, 1, 0, 1, 1, 0, 1, 1];
    const generator = [1, 0, 0, 1, 1];
    const fcs = [1, 1, 1, 0];
    const transmittedFrame = frame.concat(fcs);
    assert.deepStrictEqual([0, 0, 0, 0], getFCS(generator, transmittedFrame));
  });

  it('Should pass with random example (most of the time)', () => {
    const frame = [];
    const generator = [1, 0, 0, 1, 1];

    for (let i = 0; i < 10; i++) {
      // generates a random sequence of bits
      const bit = Number(!(Math.random() > 0.5));
      frame.push(bit);
    }

    const fcs = getFCS(generator, frame);
    assert.deepStrictEqual([0, 0, 0, 0], getFCS(generator, frame.concat(fcs)));
  });

  it('Should FCS check fail when transmitted data is changed (second bit)', () => {
    const frame = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0];
    const generator = [1, 1, 0, 0, 1, 0];
    const fcs = getFCS(generator, frame);
    const transmittedFrame = frame.concat(fcs);

    // changing a bit in frame
    assert.equal(transmittedFrame[1], 0);
    transmittedFrame[1] = 1;
    assert.equal(transmittedFrame[1], 1);

    assert.notDeepStrictEqual([0, 0, 0, 0, 0], getFCS(generator, transmittedFrame));
  });

  it('Should FCS check fail when transmitted data is changed (first bit)', () => {
    const frame = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0];
    const generator = [1, 1, 0, 0, 1, 0];
    const fcs = getFCS(generator, frame);
    const transmittedFrame = frame.concat(fcs);

    // changing a bit in frame
    assert.equal(transmittedFrame[0], 1);
    transmittedFrame[0] = 0;
    assert.equal(transmittedFrame[0], 0);

    assert.notDeepStrictEqual([0, 0, 0, 0, 0], getFCS(generator, transmittedFrame));
  });

  it('Should FCS check fail when transmitted data is changed (FCS section)', () => {
    const frame = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0];
    const generator = [1, 1, 0, 0, 1, 0];
    const fcs = getFCS(generator, frame);
    const transmittedFrame = frame.concat(fcs);

    // changing a bit in frame
    assert.equal(transmittedFrame[11], 1);
    transmittedFrame[11] = 0;
    assert.equal(transmittedFrame[11], 0);

    assert.notDeepStrictEqual([0, 0, 0, 0, 0], getFCS(generator, transmittedFrame));
  });
});
