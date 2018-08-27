import 'reflect-metadata'
import './env'

import express from 'express'
import expressHandlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import mailer from 'express-mailer'

import { checkAuthState } from './middleware/auth'

import ArticleRoutes from './routes/articles'
import AuthRoutes from './routes/auth'
import NWNRoutes from './routes/nwn'

import config from './config'
import './db'

const app = express()

app.listen(config.port, config.host, () => console.log("Server running on 9090 with automatic restart"))

app.engine('handlebars', expressHandlebars())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

mailer.extend(app, config.mail)

app.disable('x-powered-by')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
})

app.use(checkAuthState)

app.use('/article', ArticleRoutes)
app.use('/auth', AuthRoutes)
app.use('/nwn', NWNRoutes)
