const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const connectDB = require('./config/db')

// other imports
const schema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index')

//Connect Database
connectDB();


// Create an express server and a GraphQL endpoint
const app = express();



app.use(bodyParser.json());

app.use('/graphql', graphqlHttp(
    {
        schema: schema,
        rootValue : resolvers,
        graphiql: true
    }
))


app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));