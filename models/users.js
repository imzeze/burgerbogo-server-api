/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define(
    "users",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      birth_year: {
        type: "YEAR",
        allowNull: true,
      },
      is_admin: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 0,
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      verified: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 0,
      },
      verify_key: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      gender: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );
  users.associate = (models) => {
    users.hasMany(models.Review);
  };
  return users;
};
