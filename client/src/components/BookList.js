import React, {useState} from 'react';
import { graphql } from 'react-apollo';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';

// const getBooksQuery = gql`
// {
//     books{
//         name
//         id
//     }
// }
// `

function BookList(props) {
    const [selectedItem, setSelectedItem] = useState({
      selected:null
    })
    function displayBooks(){
        var data = props.data;
        if(data.loading){
            return <div>Loading books...</div>
        }
        else{
            return data.books.map(book =>{
                return(
                <li key={book.id} onClick={(e) =>{setSelectedItem({selected:book.id})}}>{book.name}</li>
                )
            })
        }
    }
  return (
    <div>
      <ul id="book-list">
          {displayBooks()}
      </ul>
      <BookDetails bookId={selectedItem.selected}/>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
