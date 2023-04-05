import React from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import CharacterCard from "./CharacterCard";

function CharacterContainer({
  characters,
  handleDelete,
  handleClickLikes,
  searchTerm,
  setSearchTerm,
  onNextPage,
  onPrevPage,
  currentPage,
}) {
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ui container">
      <Segment>
        <h1>Characters</h1>
      </Segment>
      <Grid centered columns={3} stackable>
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
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Button.Group>
              <Button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                as={currentPage === 1 ? "div" : "button"}
              >
                Previous
              </Button>
              <Button.Or text={`${currentPage}`} />
              <Button
                onClick={onNextPage}
                disabled={filteredCharacters.length === 0}
                as={filteredCharacters.length === 0 ? "div" : "button"}
              >
                Next
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default CharacterContainer;
