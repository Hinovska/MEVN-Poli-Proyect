const { makeExecutableSchema } = require("graphql-tools");
const { resolvers } = require("./resolver.Graph");

const defsType = `
type Query {
  leftmovesdate(date: String!): [Move]
  leftmoves: [Move]
}
type Move {
  _id: ID
  move: String
  created: String
}
`;

module.exports = makeExecutableSchema({
  typeDefs: defsType,
  resolvers: resolvers,
});
