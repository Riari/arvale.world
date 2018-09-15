import { createConnection } from 'typeorm'
import { Article } from './entities/Article'
import { ArticleCategory } from './entities/ArticleCategory'
import { ForumCategory } from './entities/ForumCategory'
import { ForumThread } from './entities/ForumThread'
import { ForumPost } from './entities/ForumPost'
import { Role } from './entities/Role'
import { User } from './entities/User'
import { Verification } from './entities/Verification'
import config from './config'

const connection = createConnection({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'arvale-web',
  logging: 'all',
  entities: [
    Article,
    ArticleCategory,
    ForumCategory,
    ForumThread,
    ForumPost,
    Role,
    User,
    Verification
  ]
})
