import React, { useState } from "react";

function CharacterForm({ handleAddCharacter }) {
  const [name, setName] = useState("");
 
  function onSubmit(e) {
    e.preventDefault();
  
    // Define arrays of possible status and species categories
    const statuses = ["Alive", "Dead", "Unknown"];
    const species = ["Human", "Alien", "Robot"];
  
    // Generate a random index for each array
    const randomStatusIndex = Math.floor(Math.random() * statuses.length);
    const randomSpeciesIndex = Math.floor(Math.random() * species.length);
  
    const newCharacter = {
      name,
      image: `https://api.lorem.space/image/face?w=150&h=150`,
      likes: 0,
      status: statuses[randomStatusIndex], // set status to a random value from the statuses array
      species: species[randomSpeciesIndex], // set species to a random value from the species array
    };
  
    handleAddCharacter(newCharacter);
  
    // clear the form
    setName("");
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
