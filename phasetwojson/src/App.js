import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import Header from "./Header";
import CharacterForm from "./CharacterForm";
import CharacterContainer from "./CharacterContainer";
import Episodes from "./Episodes";
import LocationsContainer from "./LocationsContainer";
import ErrorPage from "./ErrorPage";
import { Icon, Label } from "semantic-ui-react";

const API = "http://localhost:3001/characters";

//potentially do all the destructuring here or in the CharacterCard component

const headers = {
  Accepts: "application/json",
  "Content-Type": "application/json",
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async function () {
      // Get the data from the API
      let data = await fetch(API).then((res) => res.json()); //returns a promise amd converts to json

      // Set the data to the state
      setCharacters(data);

      // Log the data
      console.log("characters", data);
    })();
  }, []);

  // Fetches locations data from API, sets location data to state

  useEffect(() => {
    // Fetch locations data from API
    fetch("http://localhost:3001/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((error) => console.log(error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  //function to add character to the list
  //the fetch method is used to make a request to the API
  //the method in the fetch is POST because we are adding a character to the database
  //the headers are used to specify the content type of the data being sent
  //the body is the data to be sent to the database
  //the characters state is updated to include the new character

  //fetch doent take an object,so we need to convert it to a string
  function addCharacter(char) {
    fetch(API, {
      method: "POST",
      headers,
      body: JSON.stringify(char),
    })
      .then((res) => res.json())
      .then((data) => setCharacters([...characters, data]));
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

  function handleSubmit(newCharacter) {
    // Update the characters state with the new character
    setCharacters([...characters, newCharacter]);
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
      {showForm ? <CharacterForm handleSubmit={addCharacter} /> : null}
      <div className="buttonContainer">
        {/* <button onClick={handleClick} class="ui primary button">Add a Character</button> */}
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
        <Route path="/characterform" element={<CharacterForm />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
