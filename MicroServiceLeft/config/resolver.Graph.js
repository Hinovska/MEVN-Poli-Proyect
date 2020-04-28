const modelMoveLeft = require("../models/modelMove");

function MoveLeft() {
  var self = this;
  self.resolvers = {
    Query: {
      leftmoves: () => {
        return self.selectLeft().catch((error) => console.log(error.stack));
      },

      leftmovesdate: (date) => {
        console.log(date);
        return self
          .selectLeft(date)
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

  self.selectLeft = async function consulta(created) {
    console.log("create: ", created);
    if (created) {
      let data = new Date(created);
      const moveLeft = await modelMoveLeft
        .find({
          createdAt: {
            $gte: data.toDate(),
            $lte: moment(data).endOf("day").toDate(),
          },
        })
        .select()
        .exec();
      return moveLeft;
    } else {
      const moveLeft = await modelMoveLeft.find().select().exec();
      return moveLeft;
    }
  };
}

module.exports = new MoveLeft();
