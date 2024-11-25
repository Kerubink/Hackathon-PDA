import { DataTypes } from 'sequelize';
import sequelize from '../database/config.js'; 

const Hotel = sequelize.define('Hotel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING(255),
  },
  city: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  placeId: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  thumb: {
    type: DataTypes.STRING(255),
  },
  images: {
    type: DataTypes.JSON,
  },
  amenities: {
    type: DataTypes.JSON, 
  },
  pois: {
    type: DataTypes.JSON, 
  },
  reviews: {
    type: DataTypes.JSON,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  cnpj: {
    type: DataTypes.STRING(20),
    validate: {
      is: /^\d{14}$/, 
    },
  },
}, {
  tableName: 'Hotels', 
  timestamps: true,
});

export default Hotel;
