import React, { useState } from "react";

function CharacterForm({ handleAddCharacter }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Alive");
  const [species, setSpecies] = useState("Human");

  // Adding state hooks for status and species to store the selected values.
  // Changing the onSubmit function to use the selected status and species values.
  // Adding select elements for the status and species fields, with their values controlled by their respective state hooks.
  // Updating the setName hook to clear the input field.
  // Adding setStatus and setSpecies hooks to clear the select fields.

  function onSubmit(e) {
    e.preventDefault();

    const newCharacter = {
      name,
      image: `https://api.lorem.space/image/face?w=150&h=150`,
      likes: 0,
      status,
      species,
    };

    handleAddCharacter(newCharacter);

    setName("");
    setStatus("Alive");
    setSpecies("Human");
  }

  return (
    <div className="ui container">
      <div className="ui centered card">
        <div className="content">
          <form className="ui form" onSubmit={onSubmit}>
            <h3>Add a Character !</h3>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter a character's name..."
                className="input-text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Status</label>
              <select
                name="status"
                className="input-text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
            <div className="field">
              <label>Species</label>
              <select
                name="species"
                className="input-text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              >
                <option value="Human">Human</option>
                <option value="Alien">Alien</option>
                <option value="Robot">Robot</option>
              </select>
            </div>
            <button type="submit" className="ui primary button">
              Add Character
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CharacterForm;
