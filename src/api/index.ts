import express from 'express'
import bodyParser from 'body-parser'
const config = require('./config/app.json')
import AuthRoutes from './routes/auth'
import NWNRoutes from './routes/nwn'
import './db'

const app = express()

app.listen(config.port, config.host, () => console.log("Server running on 9090 with auto restart!"))

app.disable('x-powered-by')

app.get('/*', (req, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/auth', AuthRoutes)
app.use('/nwn', NWNRoutes)
