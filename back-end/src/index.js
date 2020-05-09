const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('./config');

const { User } = require('./models');

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String
        password: String

    }
    type Query {
        getUsers: [User]
        getUser(id: ID!): User
    }
    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
        editUser(id: ID!, firstName: String!, lastName: String!, email: String!): User!
        deleteUser(id: ID!): User!
    }
`;

const resolvers = {
  Query: {
    getUsers: async () => await User.find({}).exec(),
    getUser: async (_, args) => await User.findById(args.id).exec()
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        return await User.create(args);
      } catch (error) {
        return error.message;
      }
    },
    editUser: async (_, args) => {
      try {
        const update = { firstName: args.firstName, lastName: args.lastName, email: args.email };
        return await User.findOneAndUpdate(args.id, update, { new: true });
      } catch (error) {
        return error.message;
      }
    },
    deleteUser: async (_, args) => {
      try {
        return await User.findByIdAndDelete(args.id);
      } catch (error) {
        return error.message;
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
