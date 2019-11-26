const process = require('process');
const readLine = require('readline');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', string => {
  const reversedString = reverseString(string);
  console.log(reversedString);
  console.log('\n');
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
})

function reverseString(str) {
  return str.split('').reverse().join('');
}
