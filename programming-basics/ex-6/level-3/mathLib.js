const debug = require("debug")("vadlamaniuday:mathExtensions");

function sin(numbers) {
  if (numbers.length !== 1) {
    throw new Error("The 'sin' command requires exactly one number.");
  }
  const result = Math.sin(numbers[0]);
  debug(`sin(${numbers[0]}) = ${result}`);
  return result;
}

function cos(numbers) {
  if (numbers.length !== 1) {
    throw new Error("The 'cos' command requires exactly one number.");
  }
  const result = Math.cos(numbers[0]);
  debug(`cos(${numbers[0]}) = ${result}`);
  return result;
}

function sqrt(numbers) {
  if (numbers.length !== 1) {
    throw new Error("The 'sqrt' command requires exactly one number.");
  }
  const result = Math.sqrt(numbers[0]);
  debug(`sqrt(${numbers[0]}) = ${result}`);
  return result;
}

module.exports = { sin, cos, sqrt };
