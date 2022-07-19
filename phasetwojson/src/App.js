import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import CharacterForm from "./CharacterForm";
import CharacterContainer from "./CharacterContainer";
import Episodes from "./Episodes";
import Locations from "./Locations";
import ErrorPage from "./ErrorPage";

const API = "http://localhost:3001/characters";

//potentially do all the destructuring here or in the CharacterCard component

const headers = {
  Accepts: "application/json",
  "Content-Type": "application/json",
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    //use IIFE or Axios
    (async function () {
      let data = await fetch(API).then((res) => res.json()); //returns a promise amd converts to json
      setCharacters(data);
      console.log("characters", data);
      //user setter to setjson data to state
    })();
  }, []);
  //whenever API changes, change data in state

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  //fetch doent take an object,so we need to convert it to a string
  function addCharacter(char) {
    fetch(API, {
      method: "POST",
      headers,
      body: JSON.stringify(char),
    })
      .then((res) => res.json())
      .then((data) => setCharacters([...characters, char]));
  }

  function deleteCharacter(id) {
    console.log("deleting", id);
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers,
    }).then(
      (data) => setCharacters(characters.filter((char) => char.id !== id)) //filter out existing characters array and we're only including the ones that don't match the id that we just deleted
    );
  }

  function incrementLikes(char) {
    fetch(`${API}/${char.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ likes: char.likes + 1 }),
    }).then(() =>
      setCharacters(
        characters.map(
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
      <nav>
        <Link to="/" className="nav">
          Characters
        </Link>
        <Link to="/episodes" className="nav">
          Episodes
        </Link>
        <Link to="/locations" className="nav">
          Locations
        </Link>
      </nav>
      {showForm ? <CharacterForm handleSubmit={addCharacter} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Character</button>
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
        <Route path="/locations" element={<Locations />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
