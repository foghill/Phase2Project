import React from "react";
import { Card, Grid } from "semantic-ui-react";
import CharacterCard from "./CharacterCard";

function Character({ characters, handleDelete, handleClickLikes }) {
  return (
    <Grid centered textAlign="center">
      <Card.Group>
        {characters.map((characterData) => (
          <CharacterCard
            key={characterData.id}
            characterData={characterData}
            handleDelete={handleDelete}
            handleClickLikes={handleClickLikes}
          />
        ))}
      </Card.Group>
    </Grid>
  );
}

export default Character;
