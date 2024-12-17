const { add, multiply } = require("./mathUtils");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error(
    "Error: No arguments provided. Usage: <operation> <num1> <num2> ...\nDefault operation is addition if no operation is specified."
  );
  process.exit(1);
}

const validOperations = ["--add", "--multiply"];
let operation;
let numbers;

if (validOperations.includes(args[0])) {
  operation = args[0];
  numbers = args.slice(1);
} else {
  operation = "--add";
  numbers = args;
}

numbers = numbers.map((arg) => {
  const num = parseFloat(arg);
  if (isNaN(num)) {
    console.error(`Error: "${arg}" is not a valid number.`);
    process.exit(1);
  }
  return num;
});

let result;
if (operation === "--add") {
  result = add(numbers);
  console.log(`Sum: ${result}`);
} else if (operation === "--multiply") {
  result = multiply(numbers);
  console.log(`Product: ${result}`);
} else {
  console.error(`Error: Invalid operation "${operation}".`);
  process.exit(1);
}
