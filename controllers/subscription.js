const models = require("../models");
const shortid = require("shortid");

module.exports = {
  subscribe: function (req, res) {
    const { user } = req;
    const { course, prix, dates } = req.body;
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
              where: { id: items.course, prix: prix },
            })
            .then((newSubscri) => {
              if (newSubscri)
                models.abonnement.create(items).then((lastsubscri) => {
                  res.json(lastsubscri);
                });
              else
                res.json({
                  error: "Montant incorrect pour cette abonnement...",
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
  subscri: function (req, res) {
    const { user } = req;
    models.abonnement
      .findAll({
        include: [
          {
            model: models.users,
            // attributes: ["id", "username"],
            where: { users: user.userId },
          },
        ],

        //
      })
      .then((set) => {
        if (set) res.json({ result: set });
        else res.json("Vous etes abonné à aucun cours...");
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({
          error: "Someone went wrong...",
        });
      });
  },
};
