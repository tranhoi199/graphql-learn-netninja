import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import {ApolloClient, ApolloProvider} from '@apollo/client';
//component
import BookList from './components/BookList';
import AddBook from './components/addBook';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main" className="App">
        <h1>Hoi Tran List</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
    
  );
}

export default App;
