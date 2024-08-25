const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const Schema = require("./Schema/schema");
const mongoose = require('mongoose');
const { once } = require('lodash');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://jmsjbb1101:liJ9KyMvN5aTUVDQ@cluster0.hn2ok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
mongoose.connection.once('open',()=>{
    console.log("Connected to DataBase");
})
//This connects express to Graphql using this helpful package graphqlHTTP of express
app.use('/graphql',graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

app.listen(4000,()=>{
    console.log("Now listening on port 4000");
})