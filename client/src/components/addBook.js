import React, {useState} from "react";
import { graphql } from "react-apollo";
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';
import {flowRight as compose} from 'lodash';


function AddBook(props) {
//   console.log(props);

  const [formData, setFormData] = useState({})

  const onChange = (e) =>{
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      })
  }

  function displayAuthors(){
      var data = props.getAuthorsQuery;
      if(data.loading){
          return (<option disabled>Loading Authors...</option>)
      }
      else{
          return data.authors.map(author =>{
              return (<option key={author.id} value={author.id}>{author.name}</option>);
          })
      }
  }

  function submitForm(e){
      e.preventDefault();
      console.log('on submit', formData);
      props.addBookMutation({
          variables:{
              name: formData.name,
              genre: formData.genre,
              authorId: formData.authorId
          },
          refetchQueries:[{query: getBooksQuery}]
      })
  }

  return (
    <form id="add-book" onSubmit={(e) => submitForm(e)}>
      <div className="field">
        <label> Book name: </label> <input type="text" name="name" onChange={(e) =>onChange(e)}/>
      </div>{" "}
      <div className="label">
        <label> Genre: </label> <input type="text" name="genre" onChange={(e) =>onChange(e)}/>
      </div>{" "}
      <div className="field">
        <label> Author: </label>{" "}
        <select name="authorId" onChange={(e) =>onChange(e)}>
          <option> Select author </option>
           {displayAuthors()}{" "}
        </select>{" "}
      </div>{" "}
      <button> + </button>{" "}
    </form>
  );
}

// export default graphql(getAuthorsQuery)(AddBook);
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);