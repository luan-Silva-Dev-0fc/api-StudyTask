// src/models/CurtidaPortuguês.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class CurtidaPortuguês extends Model {}

CurtidaPortuguês.init(
  {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arquivoPortuguesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ArquivoPortugues",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "CurtidaPortuguês",
  }
);

module.exports = CurtidaPortuguês;
