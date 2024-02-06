// src/MyApp.js
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';



function MyApp() {
  const [characters, setCharacters] = useState([]);
  // function removeOneCharacter(index) {
  //   const updated = characters.filter((character, i) => {
  //     return i !== index;
  //   });
  //   setCharacters(updated);
  // }
  function removeOneCharacter(index) {
    const userToDelete = characters[index];
  
    if (userToDelete && userToDelete._id) {
      const deleteUrl = `http://localhost:8000/users/${userToDelete._id}`;
  
      fetch(deleteUrl, {method: 'DELETE'}) 
        .then(response => {
          if (response.status === 204) {
            const updated = characters.filter((character, i) => {
              return i !== index;
            });
            setCharacters(updated);
          } else if (response.status === 404) {
            console.error('User not found, could not delete.');
          } else {
            console.error('Unexpected error.');
          }
        })
        .catch(error => console.error('Error:', error));
    } else {
      console.error('Invalid user data or missing ID.');
    }
  }

  function updateList(person) {
    postUser(person)
      .then((response) => response.json()) 
      .then((addedUser) => {
        setCharacters([...characters, addedUser]); 
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  // return (
  //   <div className = "container">
  //       <Table 
  //         characterData={characters}
  //         removeCharacter={removeOneCharacter}
  //       />
  //   </div>
  // );

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
