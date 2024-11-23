const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hackathon_1bbk', 'hackathon_1bbk_user', '9eJrr6kxmoyny2wo40ym1nlWXeeATzIp', {
  host: 'dpg-ct0vbf52ng1s73e2nrig-a',
  dialect: 'postgres', 
  port: 5432,
  logging: false, 
});

module.exports = sequelize;
