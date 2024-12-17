// math.js

const args = process.argv.slice(2);

try {
  if (args.length === 0 || args.includes("--help")) {
    console.log(`
Usage: node math.js [--multiply] <num1> <num2> ...
Options:
  --multiply    Multiply the numbers instead of adding them
  --help        Show usage instructions
`);
    process.exit(0);
  }

  const isMultiply = args[0] === "--multiply";
  const numbers = args.slice(isMultiply ? 1 : 0).map((arg) => {
    const num = parseFloat(arg);
    if (isNaN(num)) throw new Error(`Invalid number: ${arg}`);
    return num;
  });

  const result = isMultiply
    ? numbers.reduce((acc, num) => acc * num, 1)
    : numbers.reduce((acc, num) => acc + num, 0);

  console.log(`${isMultiply ? "Product" : "Sum"}: ${result}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
