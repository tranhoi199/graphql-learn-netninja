const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');

//allow cross-origin-requests
app.use(cors());

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://hoitran123:hoitran123@cluster0.ye7cb.mongodb.net/gqltut?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


mongoose
 .connect(
  "mongodb+srv://hoitran123:hoitran123@cluster0.ye7cb.mongodb.net/gqltut?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
 )
 .then(() => console.log("Connected to MongoDB Atlas"))
 .catch(err => console.log("Error: ", err.message));

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
