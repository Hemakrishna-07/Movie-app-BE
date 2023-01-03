// console.log (document)  // only in browser
// console.log (window)  // only in browser
// console.log (global)  // only in nodeJS

// normal method
const add = (a, b) => a + b
console.log (add(5, 10))

// process argv method
console.log(add(process.argv[2], process.argv[3]))
// it will concat the values so that we are going for array destructuring

// process argv array destructuring method
const [ , , n1, n2] = process.argv;
console.log (add(+n1, +n2))