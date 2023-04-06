import React, { useState, useEffect } from "react";
import { Card, Grid, Segment } from "semantic-ui-react";

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [characterNames, setCharacterNames] = useState({});

  useEffect(() => {
    // define an async function to fetch character names from API
    const fetchCharacterNames = async () => {
      try {
        // fetch all episodes from the API
        const episodesRes = await fetch("http://localhost:3001/episodes");
        const episodesData = await episodesRes.json();
        // set episodes in state with response data
        setEpisodes(episodesData);
  
        // extract character URLs from all episodes
        const characterUrls = episodesData.flatMap((episode) => episode.characters);
        // fetch character data for all URLs in parallel
        const characterResponses = await Promise.all(
          characterUrls.map((url) => fetch(url))
        );
        // parse response data for all character data
        const characterDataArray = await Promise.all(
          characterResponses.map((res) => res.json())
        );
  
        // use reduce to combine character names into a single object with character ID as the key
        const allNames = characterDataArray.reduce((acc, characterData) => {
          acc[characterData.id] = characterData.name;
          return acc;
        }, {});
  
        // set character names in state with allNames object
        setCharacterNames(allNames);
      } catch (error) {
        console.log(error);
      }
    };
  
    // call the fetchCharacterNames function when the component mounts
    fetchCharacterNames();
  }, []);
  
  return (
    <div className="ui container">
      <Segment>
        <h1>Episodes</h1>
      </Segment>
      <Grid centered columns={3} stackable>
        <Grid.Row>
          {episodes.map((episode) => (
            <Grid.Column key={episode.id}>
              <Card fluid style={{ maxWidth: "600px", height: "100%" }}>
                <Card.Content>
                  <Card.Header>
                    {episode.name} ({episode.episode})
                  </Card.Header>
                  <Card.Description style={{ maxHeight: "200px", overflow: "auto" }}>
                    <p>Air date: {episode.air_date}</p>
                    <p>Characters:</p>
                    <ul>
                      {episode.characters.slice(0, 8).map((characterUrl) => {
                        const characterId = characterUrl.split("/").pop();
                        const characterName = characterNames[characterId] || "";
                        return (
                          <li key={characterId}>
                            {characterName}
                          </li>
                        );
                      })}
                    </ul>
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
