import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('hackathon_1bbk', 'hackathon_1bbk_user', '9eJrr6kxmoyny2wo40ym1nlWXeeATzIp', {
  host: 'dpg-ct0vbf52ng1s73e2nrig-a.oregon-postgres.render.com',
  dialect: 'postgres',
  port: 5432,
  logging: console.log,
  pool: {
    max: 10,
    min: 0,
    acquire: 120000,
    idle: 120000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

export { sequelize };