import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: 'postgres',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined
  }
)
export default sequelize;
