// 1. Use the inquirer npm package to get user input
// 2. Use the qr-image npm package to turn the user entered URL inot a QR code image
// 3. Create a txt file to save the user input using the native fs node module

import inquirer from 'inquirer'
import qr from 'qr-image'
import fs from 'fs'

inquirer
  .prompt([
    {
        "message": "type URL ",
        "name": "URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL
    const qr_svg = qr.image(url)
    qr_svg.pipe(fs.createWriteStream('qr_img.png'))

    fs.writeFile('URL.txt', url, (err) => {
        if (err) throw err
        console.log('file created')
    })
  })
  .catch((error) => {
    console.log(error)
  })

