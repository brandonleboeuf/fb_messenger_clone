# [parent, args, context, info](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments)

# parent

- The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain).

- For resolvers of top-level fields with no parent (such as fields of Query), this value is obtained from the rootValue function passed to [Apollo Server's constructor](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructor).

# args

- An object that contains all GraphQL arguments provided for this field.

- For example, when executing query{ user(id: "4") }, the args object passed to the user resolver is { "id": "4" }.

# context

- An object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, dataloader instances, and anything else to track across resolvers.

- See The [context argument for more information.](https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument)

# info

- Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.

- Its core fields are listed in the GraphQL.js source code, and it is extended with additional functionality by other modules, like [apollo-cache-control.](https://github.com/apollographql/apollo-server/tree/570f548b887/packages/apollo-cache-control)
