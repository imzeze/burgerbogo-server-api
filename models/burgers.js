/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const burgers = sequelize.define(
    "Burger",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      price_single: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      price_set: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      price_combo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      calorie: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      released_at_year: {
        type: DataTypes.SMALLINT(4).ZEROFILL,
        allowNull: true,
      },
      released_at_month: {
        type: DataTypes.TINYINT(2).ZEROFILL,
        allowNull: true,
      },
      released_at_day: {
        type: DataTypes.TINYINT(2).ZEROFILL,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      protein: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      natrium: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      sugar: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
      saturated_fat: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
    },
    {
      sequelize,
      tableName: "burgers",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
      defaultScope: {
        attributes: {
          exclude: ["BrandId"],
        },
      },
    }
  );

  burgers.associate = (models) => {
    burgers.belongsTo(models.Brand, { foreignKey: "brand_id" });
    burgers.hasMany(models.Review, { as: "Review" });
    burgers.hasMany(models.BIngredient);
    burgers.hasMany(models.TBurger);
    burgers.addScope("burgersToday", {
      attributes: [
        "id",
        "name",
        "price_single",
        "price_set",
        "price_combo",
        "image",
      ],
      include: [{ model: models.Brand, attributes: ["name"] }],
    });
  };

  return burgers;
};
