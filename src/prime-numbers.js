'use strict';

module.exports = (primes = []) => {

  const generatePrimes = index => {
    if (primes.length === 0) {
      primes.push(2);
    }

    let current = primes[primes.length - 1] + 1;

    while (primes.length <= index) {

      const notPrime = primes.find(prime => {
        return current % prime === 0;
      });

      if (!notPrime) {
        primes.push(current);
      }

      current++;
    }
  };

  const findPrime = index => {
    if (index < 0) {
      throw new Error('Smallest allowed seed is 0');
    }

    generatePrimes(index);
    return primes[index];
  };

  return {
    find: findPrime
  };
};
