const args = process.argv.slice(2);

try {
  if (args.length === 0) {
    throw new Error(
      "No numbers provided. Usage: node sum.js <num1> <num2> ..."
    );
  }

  const numbers = args.map((arg) => {
    const num = parseFloat(arg);
    if (isNaN(num)) throw new Error(`Invalid number: ${arg}`);
    return num;
  });

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  console.log(`Sum: ${sum}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
