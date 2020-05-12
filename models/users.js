/* jshint indent: 2 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      passwords: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      levels: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );

  User.prototype.generateJWT = function generateJWT() {
    return jwt.sign(
      {
        userid: this.id,
   
      },
      "motcle"
    );
  };

  User.prototype.toAuthJSON = function toAuthJSON() {
    return {
      id: this.id,
      levels: this.levels,
      token: this.generateJWT(),
    };
  };

  User.prototype.cryptPsswd = function cryptPsswd(password) {
    this.passwords = bcrypt.hashSync(password, 12);
  };

  User.prototype.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.passwords);
  };
  return User;
};
