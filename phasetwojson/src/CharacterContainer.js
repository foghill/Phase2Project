import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import CharacterCard from "./CharacterCard";

function Character({ characters, handleDelete, handleClickLikes }) {
  return (
    <Grid columns={4} centered textAlign="center" style={{ marginTop: "2rem", paddingLeft: "1rem" }}>
       <Segment>
        <h1>Characters</h1>
      </Segment>
      <Grid.Row>
        {characters.map((characterData) => (
          <CharacterCard
            key={characterData.id}
            characterData={characterData}
            handleDelete={handleDelete}
            handleClickLikes={handleClickLikes}
          />
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default Character;
