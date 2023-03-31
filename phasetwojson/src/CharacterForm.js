import React, { useState } from "react";

function CharacterForm({ handleSubmit }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const newCharacter = {
      name,
      image: `https://api.lorem.space/image/face?w=150&h=150`,
      likes: 0
    };

    fetch("http://localhost:3001/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCharacter),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // call the handleSubmit function to update the characters in the state of the parent component
        handleSubmit(data);
        // clear the form and display success message
        setName("");
        setImage("");
        setSuccessMessage("Character added successfully!");
        // remove success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="ui container">
      <div className="ui centered card">
        <div className="content">
          <form className="ui form" onSubmit={onSubmit}>
            <h3>Add a Character!</h3>
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
            {successMessage && (
              <div className="ui success message">{successMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CharacterForm;
