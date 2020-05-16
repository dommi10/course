const models = require("../models");
const shortid = require("shortid");

function checkError(req) {
  let message = null;
  if (!req.body.username || !req.body.passwords)
    message = "Nom ou mot de passe incorrect";
  else if (req.body.username == null || req.body.passwords == null)
    message = "completer tous le champs";
  else if (req.body.usename < 4) message = "le nom d 'utilisateur trop court";
  return message;
}

module.exports = {
  adduser: async function (req, res) {
    try {
      const { username, passwords, levels } = req.body;
      console.log(req);
      const item = new models.users({
        id: shortid.generate(),
        username: username,
        levels: levels,
      });

      if (
        (await models.users.findOne({
          where: {
            username: username,
          },
        })) != null
      ) {
        return res.status(403).json({
          error: "le nom d'utiisateur existe déjà...",
        });
      }

      item.cryptPsswd(passwords);

      const value = await models.users.create({
        id: item.id,
        username: item.username,
        passwords: item.passwords,
        levels: item.levels,
      });

      console.log(value);
      return res.status(200).json({
        result: value,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "something went wrong... ",
      });
    }
  },
  login: function (req, res) {
    try {
      if (checkError(req))
        return res.status(400).json({
          error: checkError(req),
        });

      const { username, passwords } = req.body;
      models.users
        .findOne({ where: { username: username } })
        .then((user) => {
          if (!user)
            return res.status(400).json({
              error: "invalited credentails...",
            });

          if (user.comparePassword(passwords))
            return res.status(200).json({
              user: user.toAuthJSON(),
            });
          res.status(400).json({
            error: "invalid credentials",
          });
        })
        .catch({});
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "some one went wrong...",
      });
    }
  },
  users: async function (req, res) {
    try {
      const users = await models.users.findAll();
      return res.status(200).json({
        result: users,
      });
    } catch (error) {
      return res.status(400).json({
        error: "someone went wrong...",
      });
    }
  },
  update: async function (req, res) {
    try {
      const { id, username, passwords, levels } = req.body;
      const inst = module.exports;
      models.users
        .findOne({
          where: { id },
        })
        .then((todo) => {
          if (todo) {
            todo.update({ username, passwords, levels }).then((newTodo) => {
              return res.status(200).json({
                result: newTodo,
              });
            });
          } else {
            inst.adduser(req, res);
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "someone went wrong...",
      });
    }
  },
};
