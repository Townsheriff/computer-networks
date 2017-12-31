'use strict';

const assert = require('assert');
const PrimeNumbers = require('../src/prime-numbers');

describe('Prime Numbers', () => {
  const primes = [2, 3, 5, 8];

  it('Provide invalid seed for finding prime', () => {
    const primeNumbers = PrimeNumbers();

    assert.throws(() => {
      primeNumbers.find(-1)
    }, Error, 'Smallest allowed seed is 0');
  });

  it('Find prime number with seed 0', () => {
    const primeNumbers = PrimeNumbers(primes);
    assert.equal(primeNumbers.find(0), 2);
  });

  it('Find prime number with seed 1', () => {
    const primeNumbers = PrimeNumbers(primes);
    assert.equal(primeNumbers.find(1), 3);
  });

  it('Find prime number with seed 2', () => {
    const primeNumbers = PrimeNumbers(primes);
    assert.equal(primeNumbers.find(2), 5);
  });

  it ('Find prime number with seed 19', () => {
    const primeNumbers = PrimeNumbers();
    assert.equal(primeNumbers.find(19), 71);
  });

  it('Should find correct coprime for 10', () => {
    const primeNumbers = PrimeNumbers();
    assert.equal(primeNumbers.coprime(10), 3);
  });

  it('Should find correct coprime for 30', () => {
    const primeNumbers = PrimeNumbers();
    assert.equal(primeNumbers.coprime(30), 7);
  });

  it('Should find correct coprime for 210', () => {
    const primeNumbers = PrimeNumbers();
    assert.equal(primeNumbers.coprime(210), 11);
  });
});
