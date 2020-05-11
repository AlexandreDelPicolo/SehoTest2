require('./config');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server');
const { User } = require('./models');
const express = require('express');
const auth = require('./auth');

const typeDefs = gql`
  type User {
      id: ID!
      firstName: String
      lastName: String
      email: String
      password: String
  }

  type Auth {
      allowed: Boolean
      token: String
  }

  type Query {  
      getUsers: [User]
  }

  type Mutation {
      addUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
      editUser(id: ID!, firstName: String!, lastName: String!, email: String!): User!
      deleteUser(id: ID!): User!
      authenticate(email: String!, password: String!): Auth!
      register(firstName: String!, lastName: String!, email: String!, password: String!): Auth!
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => await User.find({}).exec(),
  },

  Mutation: {
    addUser: async (_, args) => {
      args.password = await auth.hashPasswordAsync(args.password);
      return await User.create(args);
    },
    editUser: async (_, args) => {
      const update = { firstName: args.firstName, lastName: args.lastName, email: args.email };
      return await User.findOneAndUpdate(args.id, update, { new: true });
    },
    deleteUser: async (_, args) => {
      return await User.findByIdAndDelete(args.id);
    },
    register: async (_, args) => {
      args.password = await auth.hashPasswordAsync(args.password);

      const user = await User.create(args);
      const token = auth.generateToken(user);

      return { allowed: true, token: token };
    },
    authenticate: async (_, args) => {
      const user = await User.findOne({ "email": args.email }).exec();

      if (!user || !await auth.checkPasswordAsync(args.password, user.password))
        return { allowed: false, token: null };

      const token = auth.generateToken(user);
      return { allowed: true, token: token };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (async ({ req }) => await auth.verifyToken(req))
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
