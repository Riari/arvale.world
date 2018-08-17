import { Sequelize } from 'sequelize-typescript'
let config = require('./config/db.json')

config = process.env.NODE_ENV === 'production' ? config.production : config.development

const db = new Sequelize(config)

db.addModels([__dirname + '/models/*.ts'])

export default db
