const winston = require("winston");
const chalk = require("chalk");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      const color = level === "error" ? chalk.red : chalk.green;
      return color(` ${timestamp} ${level}: ${message}`);
    })
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({ filename: "app-log.txt" }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message }) =>
          chalk.red(` ${level}: ${message}`)
        )
      ),
    }),
  ],
});

function add(numbers) {
  const result = numbers.reduce((sum, num) => sum + num, 0);

  return result;
}

function multiply(numbers) {
  const result = numbers.reduce((product, num) => product * num, 1);

  return result;
}

function divide(numbers) {
  if (numbers.includes(0)) {
    logger.error(`Cannot divide ${numbers.join(", ")} - Division by zero`);
    throw new Error("Division by zero is not allowed");
  }
  const result = numbers.reduce((quotient, num) => quotient / num);

  return result;
}

function subtract(numbers) {
  const result = numbers.reduce((difference, num) => difference - num);

  return result;
}

module.exports = { add, multiply, divide, subtract, logger };
