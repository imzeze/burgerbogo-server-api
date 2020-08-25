/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const burgers_have_ingredients = sequelize.define(
    "BIngredients",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      burger_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "burgers_have_ingredients",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );
  burgers_have_ingredients.associate = (models) => {
    burgers_have_ingredients.belongsTo(models.Burgers, {
      foreignKey: "burger_id",
    });
    burgers_have_ingredients.belongsTo(models.Ingredients, {
      foreignKey: "ingredient_id",
    });
  };
  return burgers_have_ingredients;
};