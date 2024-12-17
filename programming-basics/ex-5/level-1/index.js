require("dotenv").config(); // Load environment variables from .env file
const { add, multiply, divide, subtract, logger } = require("./mathUtils");
const chalk = require("chalk");
const debug = require("debug")("vadlamaniuday:index");

const operation = process.argv[2];

if (!operation) {
  console.error(
    "Error: Invalid number of arguments. There must be at least 1 argument to specify the operation."
  );
  process.exit(1);
}

const number1 = parseFloat(process.env.NUMBER1);
const number2 = parseFloat(process.env.NUMBER2);

if (isNaN(number1) || isNaN(number2)) {
  console.error(
    "Error: NUMBER1 and NUMBER2 must be valid numbers in the .env file."
  );
  process.exit(1);
}

const numbers = [number1, number2];

logger.info("Starting the application...");
debug("App started");

try {
  let result;
  if (operation === "--add") {
    result = add(numbers);
    console.log(`Sum: ${result}`);
  } else if (operation === "--multiply") {
    result = multiply(numbers);
    console.log(`Product: ${result}`);
  } else if (operation === "--divide") {
    result = divide(numbers);
    console.log(`Quotient: ${result}`);
  } else if (operation === "--subtract") {
    result = subtract(numbers);
    console.log(`Difference: ${result}`);
  } else {
    console.error(`Error: Invalid operation "${operation}".`);
    process.exit(1);
  }

  logger.info(chalk.green("Operation completed successfully."));
} catch (error) {
  logger.error(chalk.red("Operation failed due to an error"));
}

debug("App finished");
