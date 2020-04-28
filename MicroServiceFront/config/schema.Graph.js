const { makeExecutableSchema } = require("graphql-tools");
const { resolvers } = require("./resolver.Graph");

const defsType = `
type Query {
  frontmovesdate(date: String!): [Move]
  frontmoves: [Move]
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
