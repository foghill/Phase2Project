import React from "react";

function CharacterCard({ characterData, handleDelete, handleClickLikes }) {
  const { id, status, name, species, image, likes } = characterData;
  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="char-avatar" />
      <p>{likes} Likes </p>
      <button onClick={() => handleDelete(id)} className="del-btn">
        Delete
      </button>
      <button
        onClick={() => handleClickLikes(characterData)}
        className="like-btn"
      >
        Like {"<3"}
      </button>
    </div>
  );
}

export default CharacterCard;
