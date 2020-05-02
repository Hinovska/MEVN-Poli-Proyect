const modelMoveBack = require("../models/modelMove");

function MoveBack() {
  var self = this;
  self.resolvers = {
    Query: {
      backmoves: () => {
        return self.selectBack().catch((error) => console.log(error.stack));
      },

      backmovesdate: (_, { date }) => {
        console.log(date);
        return self
          .selectBack(date)
          .then((result) => {
            return result;
          })
          .catch((error) => console.log(error.stack));
      },
    },
  };

  self.selectBack = async function consulta(created) {
    
    if (created) {
      let data = new Date(created);
      let datalimit = new Date();
      const moveBack = await modelMoveBack
        .find({
          created: {
            $gte: data,
            $lte: datalimit
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
