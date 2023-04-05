import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import CharacterCard from "./CharacterCard";

function Character({ characters, handleDelete, handleClickLikes }) {
  return (
    <div className="ui container">
      <Segment>
        <h1>Characters</h1>
      </Segment>
      <Grid columns={4} centered textAlign="center" stackable style={{ marginTop: "2rem", paddingLeft: "1rem" }}>
        <Grid.Row>
          {characters.map((characterData) => (
            <Grid.Column key={characterData.id}>
              <CharacterCard
                characterData={characterData}
                handleDelete={handleDelete}
                handleClickLikes={handleClickLikes}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Character;
