import React from "react";
import { Grid, Segment, Input } from "semantic-ui-react"; // Import Input from semantic-ui-react
import CharacterCard from "./CharacterCard";

function Character({ characters, handleDelete, handleClickLikes, searchTerm, setSearchTerm }) {
  // Filter characters based on searchTerm
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ui container">
      <Segment>
        <h1>Characters</h1>
      </Segment>
      <Input
        icon="search"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <Grid columns={4} centered textAlign="center" stackable style={{ marginTop: "2rem", paddingLeft: "1rem" }}>
        <Grid.Row>
          {filteredCharacters.map((characterData) => (
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
