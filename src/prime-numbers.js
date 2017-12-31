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

  const coprime = number => {
    const divisors = [];

    // finds a list of common divisors
    for (let i = 1; i < number / 2; i++) {
      if (number % i === 0) {
        divisors.push(i);
      }
    }

    let prime = findPrime(1);
    // for each prime checks if it is a divisor for a number
    for (let i = 2; divisors.indexOf(prime) !== -1; i++) {
      prime = findPrime(i);
    }

    return prime;
  };

  return {
    find: findPrime,
    coprime: coprime
  };
};
