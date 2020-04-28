const modelMoveBack = require("../models/modelMove");

function MoveBack() {
  var self = this;
  self.resolvers = {
    Query: {
      backmoves: () => {
        return self.selectBack().catch((error) => console.log(error.stack));
      },

      backmovesdate: (date) => {
        console.log(date);
        return self
          .selectBack(date)
          .then((result) => {
            // result.map((created) => {
            //     created.created = new Date(created.created);
            // });
            return result;
          })
          .catch((error) => console.log(error.stack));
      },
    },
  };

  self.selectBack = async function consulta(created) {
    console.log("create: ", created);
    if (created) {
      let data = new Date(created);
      const moveBack = await modelMoveBack
        .find({
          createdAt: {
            $gte: data.toDate(),
            $lte: moment(data).endOf("day").toDate(),
          },
        })
        .select()
        .exec();
      return moveBack;
    } else {
      const moveBack = await modelMoveBack.find().select().exec();
      return moveBack;
    }
  };
}

module.exports = new MoveBack();
