import sequelize from './models';

async function initDB() {
  try {
    await sequelize.sync({ force: false });
    console.log('database connected');
  } catch (err) {
    console.log(err);
  }
}

export default initDB;
