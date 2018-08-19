import express from 'express'
import expressHandlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import mailer from 'express-mailer'
const config = require('./config/app.json')
import AuthRoutes from './routes/auth'
import NWNRoutes from './routes/nwn'
import './db'

const app = express()

app.listen(config.port, config.host, () => console.log("Server running on 9090 with auto restart!"))

app.engine('handlebars', expressHandlebars())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

mailer.extend(app, config.mail)

app.disable('x-powered-by')

app.get('/*', (req, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/auth', AuthRoutes)
app.use('/nwn', NWNRoutes)
