import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import CharacterForm from "./CharacterForm";
import CharacterContainer from "./CharacterContainer";
import Episodes from "./Episodes";
import LocationsContainer from "./LocationsContainer";
import ErrorPage from "./ErrorPage";
import { v4 as uuidv4 } from 'uuid';

const API = "http://localhost:3001/characters";

//potentially do all the destructuring here or in the CharacterCard component

const headers = {
  Accepts: "application/json",
  "Content-Type": "application/json",
};

function App() {
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);


  useEffect(() => {
    // Fetch locations data from API
    fetch(API)
      .then((res) => res.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.log(error));
  }, []);

  // Fetches locations data from API, sets location data to state

  useEffect(() => {
    // Fetch locations data from API
    fetch("http://localhost:3001/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((error) => console.log(error));
  }, []);



  //This function fetches the data from the API and adds the new character to the page

function handleAddCharacter(newCharacter) {
  // Generate a unique ID for the new character
  const id = uuidv4();

  // Add the ID to the new character object
  const characterWithId = { ...newCharacter, id };

  fetch(API, {
    method: "POST",
    headers,
    body: JSON.stringify(characterWithId),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // update characters page with new character
      setCharacters((prevCharacters) => [...prevCharacters, data]);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

  

  //This function fetches the data from the API and deletes the character that has been selected with the delete button
  //The function is called when the delete button is clicked and the deleteCharacter function is passed the character ID
  //The fetch function is used to delete the character and the data is then filtered to remove the character that has been deleted

  function deleteCharacter(id) {
    console.log("deleting", id);
    fetch(`${API}/${id}`, {
      //fetch the API and the id of the character to be deleted
      method: "DELETE", //delete the character
      headers, //send the headers
    }).then(
      (data) => setCharacters(characters.filter((char) => char.id !== id)) //filter out existing characters array and we're only including the ones that don't match the id that we just deleted
    );
  }

  function incrementLikes(char) {
    fetch(`${API}/${char.id}`, {
      // we're using the id of the character we're looking at to do the fetch
      method: "PATCH",
      headers,
      body: JSON.stringify({ likes: char.likes + 1 }),
    }).then(() =>
      setCharacters(
        //we're going to set the characters state to a new array
        characters.map(
          //we're going to map over the characters array
          (oldChar) =>
            oldChar.id !== char.id //we're going to replace all the characters if it's not the one we're looking at
              ? oldChar //we're going to not change it
              : { ...oldChar, likes: oldChar.likes + 1 } // otherwise we're going to create a new Character object, spread the values of the other one into it and increment the likes by one
        )
      )
    );
  }

  return (
    <Router>
      <Header />
      <nav class="ui menu">
        <Link to="/" class="item">
          Characters
        </Link>
        <Link to="/episodes" class="item">
          Episodes
        </Link>
        <Link to="/locations" class="item">
          Locations
        </Link>
        <Link to="/characterform" class="item">
          Add a Character Form
        </Link>
      </nav>
      <div className="buttonContainer">
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <CharacterContainer
              characters={characters}
              handleDelete={deleteCharacter}
              handleClickLikes={incrementLikes}
            />
          }
        />

        <Route path="/episodes" element={<Episodes />} />
        <Route
          path="/locations"
          element={<LocationsContainer locations={locations} />}
        />
        <Route
          path="/characterform"
          element={<CharacterForm handleAddCharacter={handleAddCharacter} setCharacters={setCharacters}/>}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
