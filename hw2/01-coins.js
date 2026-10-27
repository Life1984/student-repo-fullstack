/** Exercise 01 - Coins */

// These values and labels are shared by every change calculation.
const denominations = [
  { value: 100, singular: 'dollar', plural: 'dollars' },
  { value: 25, singular: 'quarter', plural: 'quarters' },
  { value: 10, singular: 'dime', plural: 'dimes' },
  { value: 5, singular: 'nickel', plural: 'nickels' },
  { value: 1, singular: 'penny', plural: 'pennies' },
];

// Add your function here
const calculateChange = function calculateChange(amount) {
  if (!Number.isFinite(amount)) {
    return 'Error: enter a valid number';
  }

  if (amount < 0) {
    return 'Error: the number cannot be negative';
  }

  if (amount > 100) {
    return 'Error: the number is too large';
  }

  const change = [];

  // Use whole cents to avoid losing pennies during decimal calculations.
  let remainingCents = Math.round(amount * 100);

  // Calculate each denomination from largest to smallest.
  denominations.forEach(({ value, singular, plural }) => {
    const count = Math.floor(remainingCents / value);

    // Keep only the cents still needing change.
    remainingCents %= value;

    if (count > 0) {
      const label = count === 1 ? singular : plural;
      change.push(`${count} ${label}`);
    }
  });

  return change.length === 0 ? '0 coins' : change.join(', ');
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here

// Zero and individual denominations.
console.log(calculateChange(0));
// $0.00 ==> 0 coins
console.log(calculateChange(0.01));
// $0.01 ==> 1 penny
console.log(calculateChange(0.05));
// $0.05 ==> 1 nickel
console.log(calculateChange(0.10));
// $0.10 ==> 1 dime
console.log(calculateChange(0.25));
// $0.25 ==> 1 quarter
console.log(calculateChange(1));
// $1.00 ==> 1 dollar

// Decimal calculations that can expose floating-point rounding issues.
console.log(calculateChange(0.29));
// $0.29 ==> 1 quarter, 4 pennies
console.log(calculateChange(0.1 + 0.2));
// $0.30 ==> 1 quarter, 1 nickel

// An amount using every denomination.
console.log(calculateChange(1.41));
// $1.41 ==> 1 dollar, 1 quarter, 1 dime, 1 nickel, 1 penny

// Values near and at the upper limit.
console.log(calculateChange(99.99));
// $99.99 ==> 99 dollars, 3 quarters, 2 dimes, 4 pennies
console.log(calculateChange(100));
// $100.00 ==> 100 dollars
console.log(calculateChange(100.01));
// $100.01 ==> Error: the number is too large

// Invalid inputs.
console.log(calculateChange(-0.01));
// Error: the number cannot be negative
console.log(calculateChange('4.62'));
// Error: enter a valid number
console.log(calculateChange(NaN));
// Error: enter a valid number
console.log(calculateChange(Infinity));
// Error: enter a valid number
