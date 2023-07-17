const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Category = require("./category.models.js");

const Series = db.define("series", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Category,
      key: "id",
    },
  },
});

module.exports = Series;
