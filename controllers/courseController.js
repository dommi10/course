const models = require("../models");
const shortid = require("shortid");

module.exports = {
  add: function (req, res) {
    try {
      const { title, dates } = req.body;
      const { user } = req;
      console.log("##ID-> " + shortid.generate());
      const items = {
        id: shortid.generate(),
        title: req.body.title,
        dates: dates,
        userid: user.userId,
      };

      models.course
        .findOne({ where: { title: title } })
        .then((cours) => {
          console.log("##Level-> " + user.levels);
          if (cours) res.status(403).json({ error: "ce cours existe deja" });
          else if (user.levels == 5)
            models.course
              .create(items)
              .then((newCourse) => {
                res.json({ newCourse });
              })
              .catch((err) => {
                console.log(err);
                res.status(403).json({ error: "something went wrong" });
              });
          else res.status(403).json({ error: "Acces Interdit !" });
        })
        .catch((error) => {
          console.log(error);
          res.status(403).json({ error: "something went wrong" });
        });
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        error: "some one went wrong...",
      });
    }
  },

  update: function (req, res) {
    const { id, title, dates } = req;
    const inst = module.exports;
    models.course
      .findOne({
        where: { id },
      })
      .then((update) => {
        if (update)
          update
            .update({
              title,
              dates,
            })
            .then((newUpdate) => {
              if (newUpdate) {
                res.json(newUpdate);
              } else {
                inst.add(req, res);
              }
            })
            .catch((error) => {
              console;
              res.status(403).json({
                error: "Someone went wrong...",
              });
            });
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({
          errro: "Someone went wrong...",
        });
      });
  },
  courses: function (req, res) {
    const { user } = req;
    models.course
      .findAll({
        where: { userid: user.userId },
      })
      .then((courses) => {
        if (!courses) {
          res.json(courses);
        } else {
          res.status(403).json({
            error: "Aucun cours enregistrer",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({
          error: "someone went wrong",
        });
      });
  },
  deleted: function (req, res) {
    const { user } = req;
    const { id } = req.body;

    if (user.levels == 5) res.json("Acces refuser...");
    else
models.




      models.course
        .destroy({
          where: { userid: user.userId, id },
        })
        .then((isdelete) => {
          if (isdelete)
            res.json({
              error: "success",
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(403).json({
            error: "someone went wrong...",
          });
        });
  },
  // course:function(re)
};
