const modelMoveFront = require("../models/modelMove");

function MoveFront() {
  var self = this;
  self.resolvers = {
    Query: {
      frontmoves: () => {
        return self.selectFront().catch((error) => console.log(error.stack));
      },

      frontmovesdate: (_, { date }) => {
        console.log(date);
        return self
          .selectFront(date)
          .then((result) => {
            return result;
          })
          .catch((error) => console.log(error.stack));
      },
    },
  };

  self.selectFront = async function consulta(created) {
    if (created) {
      let data = new Date(created);
      let datalimit = new Date();
      const moveFront = await modelMoveFront
        .find({
          created: {
            $gte: data,
            $lte: datalimit,
          },
        })
        .select()
        .exec();
      return moveFront;
    } else {
      const moveFront = await modelMoveFront.find().select().exec();
      return moveFront;
    }
  };
}

module.exports = new MoveFront();
