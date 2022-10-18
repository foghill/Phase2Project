import React from "react";
import CharacterCard from "./CharacterCard";

function Character({ characters, handleDelete, handleClickLikes }) {
  return (
    <div class="ui center aligned grid">
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
