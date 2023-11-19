const fs = require('fs')

fs.readFile('message2.txt', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
})