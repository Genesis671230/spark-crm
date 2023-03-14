// var mv = require('mv')

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }

// export default async (req, res) => {
//   const data = await new Promise((resolve, reject) => {
//     const form = new IncomingForm()

//     form.parse(req, (err, field, file) => {
//       if (err) return reject(err)
//       console.log('field', field.file)
//       console.log('path', field.file)
//       var oldPath = field.file.filepath
//       var newPath = `./public/uploads/${field.file.originalFilename}`
//       mv(oldPath, newPath, function (err) {})
//       res.status(200).json({ message: 'file uploaded' })
//     })
//   })
// }

import Formidable from 'formidable-serverless'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false
  }
}

export default function (req, res) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      //   multiples: true,
      keepExtensions: true
    })

    form
      .on('file', (name, file) => {
        console.log('file: ', file)
        console.log('name: ', name)

        const data = fs.readFileSync(file.path)
        fs.writeFileSync(`public/uploads/${file.name}`, data)
        fs.unlinkSync(file.path)
      })
      .on('aborted', () => {
        reject(res.status(500).send('Aborted'))
      })
      .on('end', () => {
        resolve(res.status(200).send('File uploaded successfully'))
      })

    await form.parse(req)
  })
}
