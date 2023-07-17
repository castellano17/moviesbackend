const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Category = db.define("category", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  nameCategory: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Category;
