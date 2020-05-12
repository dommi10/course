/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "abonnement",
    {
      id: {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true,
      },
      course: {
        type: DataTypes.STRING(25),
        allowNull: true,
        references: {
          model: "course",
          key: "id",
        },
      },
      users: {
        type: DataTypes.STRING(25),
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      prix: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      dates: {
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
      tableName: "abonnement",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
};
