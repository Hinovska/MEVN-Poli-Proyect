const modelMoveFront = require("../models/modelMove");

function MoveFront() {
  var self = this;
  self.resolvers = {
    Query: {
      frontmoves: () => {
        return self.selectFront().catch((error) => console.log(error.stack));
      },

      frontmovesdate: (date) => {
        console.log(date);
        return self
          .selectFront(date)
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

  self.selectFront = async function consulta(created) {
    console.log("create: ", created);
    if (created) {
      let data = new Date(created);
      const moveFront = await modelMoveFront
        .find({
          createdAt: {
            $gte: data.toDate(),
            $lte: moment(data).endOf("day").toDate(),
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
