import { createConnection } from 'typeorm'
import entities from './entities'
let config = require('./config/db.json')

config.entities = entities

const connection = createConnection(config)
