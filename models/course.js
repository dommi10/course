/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "course",
    {
      id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      dates: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      userid: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      deleted: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: "0",
      },
    },
    {
      tableName: "course",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
