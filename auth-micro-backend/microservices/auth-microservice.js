// Import ApolloServer and gql
const { ApolloServer, gql } = require('apollo-server-express');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const port = 3001;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

//define mongodb schema
const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true},
    email: { type: mongoose.Schema.Types.String, required: true, unique: true},
    password: { type: mongoose.Schema.Types.String, required: true}
});

const user = mongoose.model('User', userSchema);

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        password: String!
        email: String!
        token: String
    }

    type Query {
        me: User
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        logout(token: String!): String
    }
`;

const resolvers = {
    Query: {
        me: async (_, __, { user }) => {
            if (!user) throw new Error('Not authenticated');
            return await User.findById(user.id);
        }
    },
    Mutation: {
        signup: async (_, { username, email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { id: user.id, username: user.username, email: user.email, token};
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) throw new Error('Invalid password');
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { id: user.id, username: user.username, email: user.email, token };
        },
        logout: async (_, { token }) => {
            const user = await User.findOne({ token });
            if (!user) throw new Error('User not found');
            user.token = null;
            await user.save();
            return 'User logged out successfully!';
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            return { user };
        } catch {
            return {};
        }
    }
});

// Start the Apollo server before applying middleware
(async () => {
    await server.start();
    server.applyMiddleware({ app });
    const port = 3001;
    app.listen(port, () => {
        console.log(`Authentication microservice ready at http://localhost:${port}${server.graphqlPath}`);
    });
})();
