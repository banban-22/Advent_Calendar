const graphql = require('graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = graphql;
const User = require('../models/User');
const AuthService = require('../services/auth');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args, req) {
        const { name, email, password } = args;
        return AuthService.signup({ name, email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve(parent, args, req) {
        return new Promise((resolve, reject) => {
          if (!req.isAuthenticated()) {
            throw new Error('User is not authenticated!');
          }

          const currentUser = req.user;

          req.logout((err) => {
            if (err) {
              console.error('Error during logout: ', err);
              throw new Error('Logout Failed');
            }
          });

          req.session.regenerate((regenerateErr) => {
            if (regenerateErr) {
              console.error('Error regenerating session: ', regenerateErr);
              reject(new Error('Logout failed'));
            }
            resolve(currentUser);
          });
        });
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args, req) {
        try {
          const { email, password } = args;
          const user = AuthService.login({ email, password, req });
          return user;
        } catch (err) {
          console.error('Login error: ', err);
          throw err;
        }
      },
    },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parent, args, req) {
        return req.user;
      },
    },
    // users: {
    //   type: new GraphQLList(UserType),
    //   resolve(parent, args) {
    //     return User.find();
    //   },
    // },
    // user: {
    //   type: UserType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return User.findById(args.id);
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});
