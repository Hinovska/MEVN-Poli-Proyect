const modelMoveLeft = require("../models/modelMove");

function MoveLeft() {
  var self = this;
  self.resolvers = {
    Query: {
      leftmoves: () => {
        return self.selectLeft().catch((error) => console.log(error.stack));
      },

      leftmovesdate: (_, { date }) => {
        console.log(date);
        return self
          .selectLeft(date)
          .then((result) => {
            return result;
          })
          .catch((error) => console.log(error.stack));
      },
    },
  };

  self.selectLeft = async function consulta(created) {
    if (created) {
      let data = new Date(created);
      let datalimit = new Date();
      const moveLeft = await modelMoveLeft
        .find({
          created: {
            $gte: data,
            $lte: datalimit
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
