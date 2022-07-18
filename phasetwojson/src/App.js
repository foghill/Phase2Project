import React, { useState, useEffect } from "react";
import Header from "./Header";
import CharacterForm from "./CharacterForm";
import CharacterCard from "./CharacterContainer";

const rickAPI = "http://localhost:3001/results";

//potentially do all the destructuring here or in the CharacterCard component

const headers = {
  Accepts: "application/json",
  "Content-Type": "application/json",
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(rickAPI)
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, []);

  console.log(characters);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  //fetch doent take an object,so we need to convert it to a string
  function addCharacter(char) {
    fetch(rickAPI, {
      method: "POST",
      headers,
      body: JSON.stringify(char),
    })
      .then((res) => res.json())
      .then((data) => setCharacters([...characters, char]));
  }

  function deleteCharacter(id) {
    console.log("deleting", id);
    fetch(`${rickAPI}/${id}`, {
      method: "DELETE",
      headers,
    }).then(
      (data) => setCharacters(characters.filter((char) => char.id !== id)) //filter out existing characters array and we're only including the ones that don't match the id that we just deleted
    );
  }

  function incrementLikes(char) {
    fetch(`${rickAPI}/${char.id}`, {
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
    <>
      <Header />
      {showForm ? <CharacterForm handleSubmit={addCharacter} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Character</button>
      </div>
      <CharacterCard
        characters={characters}
        handleDelete={deleteCharacter}
        handleClickLikes={incrementLikes}
      />
    </>
  );
}

export default App;
