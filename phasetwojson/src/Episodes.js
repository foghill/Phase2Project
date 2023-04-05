import React, { useState, useEffect } from "react";
import { Card, Grid, Loader, Segment } from "semantic-ui-react";

// This is a functional component in a React project that displays episodes of a show along with the characters that appeared in each episode. It makes use of the Semantic UI React library for styling.

// The component has three states: episodes, characterNames, and allNamesFetched. The episodes state stores an array of episode objects fetched from an API. The characterNames state stores an object that maps character IDs to character names. The allNamesFetched state is a boolean that tracks whether all character names have been fetched.

// The component uses two useEffect hooks to fetch episodes data and character names. The first useEffect hook is responsible for fetching episodes data from the API. The second useEffect hook fetches character data for each character URL in each episode and updates the character names state with the corresponding character name.

// The component returns a loading message while the character names are being fetched. Once all character names have been fetched, the component renders a grid of episode cards. Each card contains the episode name, episode number, air date, and a list of characters that appeared in the episode. The list of characters is constructed by looping over each character URL in the episode, extracting the character ID from the URL, and finding the character name from the characterNames state. If the character name is available, it is displayed. Otherwise, an empty string is displayed.

// Overall, this component demonstrates how to use React hooks to fetch data from an API and update the state of a component based on that data. It also shows how to use conditional rendering to display a loading message until all necessary data has been fetched. The use of the Semantic UI React library provides a clean and professional-looking UI for the component.

function Episodes() {
  // state for episodes data
  const [episodes, setEpisodes] = useState([]);
  // state for character names
  const [characterNames, setCharacterNames] = useState({});
  // state for whether all character names have been fetched or not
  const [allNamesFetched, setAllNamesFetched] = useState(false);

  // on mount, fetch episodes data
  useEffect(() => {
    fetch("http://localhost:3001/episodes")
      .then((res) => res.json())
      .then((data) => setEpisodes(data))
      .catch((error) => console.log(error));
  }, []);

  // on mount, fetch character names
  useEffect(() => {
    let allNames = {};

    const fetchCharacterNames = async () => {
      // Loop over each episode
      for (let i = 0; i < episodes.length; i++) {
        const episode = episodes[i];

        // Loop over each character URL in the episode
        for (let j = 0; j < episode.characters.length; j++) {
          const characterUrl = episode.characters[j];

          // Fetch the character data from the URL
          const characterData = await fetch(characterUrl).then((res) =>
            res.json()
          );

          // Update the character names object with the character's name
          allNames[characterData.id] = characterData.name;
        }
      }

      // Set the character names state once all names have been fetched
      setCharacterNames(allNames);
      setAllNamesFetched(true);
    };

    fetchCharacterNames().catch((error) => console.log(error));
  }, [episodes]);

  // only render the episode cards once all character names have been fetched
  if (!allNamesFetched) {
    return <Loader active>Loading...</Loader>;
  }

  return (
    <div className="ui container">
      <Segment>
        <h1>Episodes</h1>
      </Segment>
      <Grid centered columns={3} stackable>
        <Grid.Row>
          {episodes.map((episode) => (
            <Grid.Column key={episode.id}>
              <Card fluid style={{ maxWidth: "600px" }}>
                <Card.Content>
                  <Card.Header>
                    {episode.name} ({episode.episode})
                  </Card.Header>
                  <Card.Description>
                    <p>Air date: {episode.air_date}</p>
                    <p>
                      Characters:{" "}
                      {episode.characters.map((characterUrl) => {
                        // Extract the character ID from the URL
                        const characterId = characterUrl.split("/").pop();
                        // Find the character name from the character ID
                        const characterName = characterNames[characterId];
                        return (
                          <span key={characterId}>
                            {/* Show the character name if it is available */}
                            {characterName ? characterName : ""}
                            <br />
                          </span>
                        );
                      })}
                    </p>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
  
}

export default Episodes;
