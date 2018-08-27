import { createConnection } from 'typeorm'
import { Article } from './entities/Article'
import { ArticleCategory } from './entities/ArticleCategory'
import { Role } from './entities/Role'
import { User } from './entities/User'
import { Verification } from './entities/Verification'

const logging = process.env.DB_LOGGING && process.env.DB_LOGGING == 'true'

const connection = createConnection({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'arvale-web',
  logging,
  entities: [
    Article,
    ArticleCategory,
    Role,
    User,
    Verification
  ]
})
