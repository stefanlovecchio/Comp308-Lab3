const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
require('dotenv').config();

const app = express();
app.use(require('cors')()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true 
}));

app.listen(4000, () => {
    console.log('Authentication Microservice running on port 4000');
});
