import React, { useState, useEffect } from "react";
import { Card, Grid, Loader, Segment } from "semantic-ui-react";

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [characterNames, setCharacterNames] = useState({});
  const [allNamesFetched, setAllNamesFetched] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/episodes")
      .then((res) => res.json())
      .then((data) => setEpisodes(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let allNames = {};

    const fetchCharacterNames = async () => {
      for (let i = 0; i < episodes.length; i++) {
        const episode = episodes[i];

        for (let j = 0; j < episode.characters.length; j++) {
          const characterUrl = episode.characters[j];

          const characterData = await fetch(characterUrl).then((res) =>
            res.json()
          );

          allNames[characterData.id] = characterData.name;
        }
      }

      setCharacterNames(allNames);
      setAllNamesFetched(true);
    };

    fetchCharacterNames().catch((error) => console.log(error));
  }, [episodes]);

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
              <Card fluid style={{ maxWidth: "600px", height: "100%" }}>
                <Card.Content>
                  <Card.Header>
                    {episode.name} ({episode.episode})
                  </Card.Header>
                  <Card.Description style={{ maxHeight: "200px", overflow: "auto" }}>
                    <p>Air date: {episode.air_date}</p>
                    <p>Characters:</p>
                    <ul>
                      {episode.characters.map((characterUrl) => {
                        const characterId = characterUrl.split("/").pop();
                        const characterName = characterNames[characterId];
                        return (
                          <li key={characterId}>
                            {characterName ? characterName : ""}
                          </li>
                        );
                      }).slice(0, 8)}
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
