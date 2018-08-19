import { createConnection } from 'typeorm'
let config = require('./config/db.json')

const connection = createConnection(config)
