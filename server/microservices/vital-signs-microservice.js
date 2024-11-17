// Import ApolloServer and gql
const { ApolloServer, gql } = require('apollo-server-express');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const cors = require('cors');



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
console.log('MONGODB_URI:', process.env.MONGODB_URI);



// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

//define mongodb chema
const vitalSignSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    heartRate: { type: Number, required: true },
    bloodPressure: { type: Number, required: true },
    temperature: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const vitalSign = mongoose.model('VitalSign', vitalSignSchema);

//define graphql schema
const typeDefs = gql`
    type VitalSign {
        id: ID
        userId: ID
        heartRate: Int
        bloodPressure: Int
        temperature: Float
        createdAt: String
    }

    type Query {
        getVitalSigns(userId: ID): [VitalSign]
    }

    type Mutation {
        addVitalSign(userId: ID!, heartRate: Int!, bloodPressure: Int!, temperature: Float!): VitalSign
        updateVitalSign(id: ID!, heartRate: Int, bloodPressure: Int, temperature: Float): VitalSign
    }
`;

// Middleware
app.use(bodyParser.json());

//define GraphQL resolvers
const resolvers = {
    Query: {
        getVitalSigns: async (_, { userId }, {user}) => {
            if (!user && !userId) {
                throw new Error("Unauthorized");
            }
            try {
                const queryUserId = userId || user._id;
                const vitalSigns = await vitalSign.find({ userId: queryUserId });
                console.log('Backend vitalSigns:', vitalSigns);
                return vitalSigns;
            } catch (error) {
                throw new Error("Error fetching vital signs: " + error.message);
            }
        }
    },
    Mutation: {
        addVitalSign: async (_, { userId, heartRate, bloodPressure, temperature }) => {
            try {
              const newVitalSign = new vitalSign({ userId, heartRate, bloodPressure, temperature });
              return await newVitalSign.save();
            } catch (error) {
              throw new Error("Error adding vital sign: " + error.message);
            }
          },
          
        updateVitalSign: async (_, { id, heartRate, bloodPressure, temperature }) => {
            try {
                const updatedVitalSign = await vitalSign.findByIdAndUpdate(
                    id,
                    { heartRate, bloodPressure, temperature }, 
                    { new: true }
                );
                if (!updatedVitalSign) throw new Error("Vital sign not found"); 
                return updatedVitalSign;
            } catch (error) {
                throw new Error("Error updating vital sign: " + error.message);
            }
        }
    }
};

// Create a new ApolloServer instance, and pass in schema and resolvers
// Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      let user = null;
      if (token) {
        try {
          user = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
        } catch (err) {
          console.error('Invalid token:', err.message);
        }
      }
      return { user }; // Include the user in the context
    },
  });
  
  (async () => {
    await server.start();
    server.applyMiddleware({ app, cors:false});
    const port =  3002 ;
    app.listen(port, () => {
        console.log(`Vital signs microservice ready at http://localhost:${port}${server.graphqlPath}`);
    });
})();