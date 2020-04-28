const modelMoveRigth = require("../models/modelMove");

function MoveRigth() {
  var self = this;
  self.resolvers = {
    Query: {
      rigthmoves: () => {
        return self.selectRigth().catch((error) => console.log(error.stack));
      },

      rigthmovesdate: (date) => {
        console.log(date);
        return self
          .selectRigth(date)
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

  self.selectRigth = async function consulta(created) {
    console.log("create: ", created);
    if (created) {
      let data = new Date(created);
      const moveRigth = await modelMoveRigth
        .find({
          createdAt: {
            $gte: data.toDate(),
            $lte: moment(data).endOf("day").toDate(),
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
