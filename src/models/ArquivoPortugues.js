const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ArquivoPortugues = sequelize.define('ArquivoPortugues', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('foto', 'vídeo'),
    allowNull: false,
  },
  arquivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    defaultValue: 'PortuguêsPortuguês',
    allowNull: false,
  }
}, {
  timestamps: true, // Para armazenar quando foi criado ou atualizado
});

module.exports = ArquivoPortugues;
