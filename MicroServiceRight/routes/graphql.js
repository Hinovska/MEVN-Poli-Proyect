const express = require('express');
const router = express.Router();
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const {moves} = require("../data/right.json");
const objschema = buildSchema(`
  type Move {
    move: String!
    creation: String!
  }
  type Query {
    allMoves: [Move!]!
  }
  type Mutation {
    createMove(move: String!): Move!
  }
`);

let getMoves = (args) => {
  let topic = args.topic;
  return moves.filter(mov => {return mov.topic == topic;});
};

const root = {
  courses: getMoves
};
/* GET contact listing. */
router.get('/',express_graphql({
  schema: objschema,
  rootValue: root,
  graphiql: true
}));

module.exports = router;
