import React, { useState } from "react";

function CharacterForm({ handleSubmit }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");


  

  function onSubmit(e) {
  e.preventDefault();

  const newCharacter = {
    name,
    image,
    id,
  };

  handleSubmit(newCharacter);
  setName("");
  setImage("");
  setId("");
}

  return (
    <div className="ui center aligned grid">
      <form className="ui form" onSubmit={onSubmit}>
        <h3>Add a Character!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a character's name..."
          className="input-text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a character's image URL..."
          className="input-text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="id"
          placeholder="Enter a character's id..."
          className="input-text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Character"
          className="ui secondary button"
        />
      </form>
    </div>
  );
}

export default CharacterForm;
