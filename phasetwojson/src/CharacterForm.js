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
      id: (Math.random() * 20).toString(),
    };

    handleSubmit(newCharacter);
  }

  return (
    <div className="container">
      <form className="add-char-form" onSubmit={onSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          //inline fuction to set the name state
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          //inline fuction to set the image state
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default CharacterForm;
