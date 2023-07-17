const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Series = require("./series.models");

const Chapter = db.define("chapter", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  seriesId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Series,
      key: "id",
    },
  },
});

module.exports = Chapter;
