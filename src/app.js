import cors from 'cors'
import express from 'express'

import routes from './routes/index.js'

export const app = express()

app.use(cors())

app.use(express.json())

// Random timer, test slow connection
// app.use((request, response, next) => {
//     const randomTime = Math.floor(Math.random() * 500) + 250
//     setTimeout(() => {
//         next()
//     }, randomTime)
// })

routes(app)

// Error middleware
app.use((error, request, response, next) => {
    console.log(`Error : ${error.message}`)
    response.status(error.status ? error.status : 500).send(error.message)
})
