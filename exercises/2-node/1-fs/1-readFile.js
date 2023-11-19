const fs = require('fs')

fs.writeFile('message.txt', 'hello from Node!', (err) => {
    if (err) throw err
    console.log('the file has been saved')
})
