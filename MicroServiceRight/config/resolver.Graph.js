const modelMoveRigth = require("../models/modelMove");

function MoveRigth() {
  var self = this;
  self.resolvers = {
    Query: {
      rigthmoves: () => {
        return self.selectRigth().catch((error) => console.log(error.stack));
      },

      rigthmovesdate: (_, { date }) => {
        console.log(date);
        return self
          .selectRigth(date)
          .then((result) => {
            return result;
          })
          .catch((error) => console.log(error.stack));
      },
    },
  };

  self.selectRigth = async function consulta(created) {
    if (created) {
      let data = new Date(created);
      let datalimit = new Date();
      const moveRigth = await modelMoveRigth
        .find({
          created: {
            $gte: data,
            $lte: datalimit,
          },
        })
        .select()
        .exec();
      return moveRigth;
    } else {
      const moveRigth = await modelMoveRigth.find().select().exec();
      return moveRigth;
    }
  };
}

module.exports = new MoveRigth();
