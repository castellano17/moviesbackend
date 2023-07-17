const Category = require("./category.models.js");
const Chapter = require("./chapters.models");
const Movies = require("./movies.models");
const Series = require("./series.models");

const initModels = () => {
  Category.hasMany(Movies);
  Movies.belongsTo(Category);

  Series.hasMany(Chapter);
  Chapter.belongsTo(Series);
};

module.exports = initModels;
