import React from "react";
import CharacterCard from "./CharacterCard";

function Character({ characters, handleDelete, handleClickLikes }) {
  return (
    <div id="char-collection">
      {characters.map((characterData) => (
        <CharacterCard
          key={characterData.id}
          characterData={characterData}
          handleDelete={handleDelete}
          handleClickLikes={handleClickLikes}
        />
      ))}
    </div>
  );
}

export default Character;
