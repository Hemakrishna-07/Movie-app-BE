// const fs = require("fs");  // Old way to import
import fs from "fs";

// ex-1
const quote = "Welcome node"
// fs.writeFile("./welcome.html", quote, (err) => {
//     console.log("Completed writing");
// });

// ex-2 & 3
const quote2 = "Live more, worry less😀";

// console.log(process.argv)
const [ , , noOfFiles] = process.argv;

// for(let i=1; i<=noOfFiles; i++){
//     fs.writeFile(`./backup/text${i}.html`, quote2, (err) => {
//         console.log("Completed writing");
//     });
// }

// ex-4 - check msg on msg.txt
fs.readFile("./msg.txt", "utf-8", (err, data) => {
    if(err) {
        console.log("Error", err);
    } else {
        console.log(data);
    }
});


// ex-5
const quote3 = "Hello, Harry Pottah!!!"
// fs.appendFile("./update.html", "\n" + quote3, (err) => {
//     console.log("Completed writing");
// });


// ex-6
// fs.unlink("./delete-me.css", (err) => {
//     console.log("Completed deleting")
// })