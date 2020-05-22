const models = require("../models");
const shortid = require("shortid");

module.exports = {
  subscribe: function (req, res) {
    const { user } = req;
    const { course, prix, dates } = req.body;
    console.log(res.body);
    const items = {
      id: shortid.generate(),
      course: course,
      users: user.userId,
      prix: prix,
      dates: dates,
    };

    models.abonnement
      .findOne({
        where: { users: items.users, course: items.course },
      })
      .then((subscri) => {
        if (subscri)
          res.json({
            error: "Vous avez déjà un abonnement pour ce cour...",
          });
        else
          models.course
            .findOne({
              where: { id: items.course },
            })
            .then((newSubscri) => {
              if (newSubscri)
                if (items.prix === newSubscri.prix)
                  models.abonnement.create(items).then((lastsubscri) => {
                    res.json(lastsubscri);
                  });
                else
                  res.json({
                    error: "Montant incorrect pour cette abonnement...",
                  });
              else
                res.json({
                  error: "Course not found...",
                });
            });
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({
          error: "someone went wrong...",
        });
      });
  },
  unsubscribe: function (req, res) {
    const { user } = req;
    const { id } = req.body;
    models.abonnement.findOne({ where: { id } }).then((unscri) => {
      //    if(unscri)
      //    unscri.abonnement.Update
    });
  },
  subscrition: function (req, res) {
    const { user } = req;
    let items = {
      user: {},
      subsriptions: {},
    };
    models.abonnement
      .findAll({
        where: { users: user.userId },
        //
      })
      .then((subscritions) => {
        if (subscritions) {
          items.subsriptions = subscritions;
          models.users
            .findOne({
              where: { id: subscritions[0].users },
              attributes: ["username"],
            })
            .then((newUser) => {
              items.user = newUser;
              res.json({ items });
            });
        } else res.json("Vous etes abonné à aucun cours...");
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({
          error: "Someone went wrong...",
        });
      });
  },
};
