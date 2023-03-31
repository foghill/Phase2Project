import React, { useState, useEffect } from "react";
import { Card, Grid, Loader, Segment } from "semantic-ui-react";

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
      <Grid centered>
        {episodes.map((episode) => (
          <Grid.Column key={episode.id} mobile={16} tablet={8} computer={4}>
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
      </Grid>
    </div>
  );
}

export default Episodes;
