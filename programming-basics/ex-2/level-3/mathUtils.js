function add(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

function multiply(numbers) {
  return numbers.reduce((acc, num) => acc * num, 1);
}

module.exports = { add, multiply };
