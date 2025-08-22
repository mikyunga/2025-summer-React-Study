import Sequelize from 'Sequelize';
import config from '../config/config.json' with { type: "json" };

const env = process.env.NODE_ENV || "development"
const currentConfig = config[env]
const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  currentConfig
)

export default sequelize;