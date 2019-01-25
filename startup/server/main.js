import { Resolver } from "../../resolvers/resolverMovie";
import { schemaMovie } from "../../schemas/schemaMovie";
import { setup } from "meteor/swydo:ddp-apollo";
import { makeExecutableSchema } from "graphql-tools";

const schema = makeExecutableSchema({
  typeDefs: schemaMovie,
  resolvers: Resolver
});

setup({
  schema
});
