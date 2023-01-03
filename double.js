// console.log (process.argv);  // argv - argument values

const double = n => n*2;
console.log (double(10));

// step-1 - array pointing
console.log(double(process.argv[2]))

// step-2 - array destructuring
const [ , , num] = process.argv;
console.log(double(num))
