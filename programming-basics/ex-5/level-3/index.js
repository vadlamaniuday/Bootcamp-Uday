require("dotenv").config();
const { add, multiply, divide, subtract, logger } = require("./mathUtils");
const chalk = require("chalk");
const debug = require("debug")("vadlamaniuday:index");
const sqlite3 = require("sqlite3").verbose();

const args = process.argv.slice(2);

if (args.length < 3) {
  console.error(
    "Error: Invalid number of arguments. There must be at least 3 arguments to specify the operation and two numbers."
  );
  process.exit(1);
}

const operation = args[0];
const numbers = args.slice(1).map((arg) => {
  const num = parseFloat(arg);
  if (isNaN(num)) {
    console.error(`Error: "${arg}" is not a valid number.`);
    process.exit(1);
  }
  return num;
});

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

  const db = new sqlite3.Database(process.env.DB_PATH);
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS operations (
      s_no INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      numbers TEXT,
      operation TEXT,
      result REAL
    )`);

    const stmt = db.prepare(
      "INSERT INTO operations (numbers, operation, result) VALUES (?, ?, ?)"
    );
    stmt.run(JSON.stringify(numbers), operation, result);
    stmt.finalize();

    db.each("SELECT * FROM operations", (err, row) => {
      if (err) {
        logger.error(chalk.red("Error fetching data from the database"));
      } else {
        console.log(row);
      }
    });
  });

  db.close();
} catch (error) {
  logger.error(chalk.red("Operation failed due to an error"));
}

debug("App finished");
