import React from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import CharacterCard from "./CharacterCard";

// CharacterContainer component accepts several props such as characters, 
// searchTerm, setSearchTerm, onNextPage, onPrevPage, and currentPage
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
  // Filter characters based on the search term (case-insensitive)
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
          {/* Iterate through filteredCharacters and render a CharacterCard for each character */}
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
            {/* Render a Button Group for pagination */}
            <Button.Group>
              {/* Render a Previous button, disable it if currentPage is 1 */}
              <Button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                as={currentPage === 1 ? "div" : "button"}
              >
                Previous
              </Button>
              {/* Display the current page number between the buttons */}
              <Button.Or text={`${currentPage}`} />
              {/* Render a Next button, disable it if there are no more characters */}
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
