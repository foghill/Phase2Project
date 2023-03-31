import React, { useState, useEffect } from "react";

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [characterNames, setCharacterNames] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/episodes")
      .then((res) => res.json())
      .then((data) => setEpisodes(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    episodes.forEach((episode) => {
      episode.characters.forEach((characterUrl) => {
        fetch(characterUrl)
          .then((res) => res.json())
          .then((characterData) =>
            setCharacterNames((prevState) => ({
              ...prevState,
              [characterData.id]: characterData.name,
            }))
          )
          .catch((error) => console.log(error));
      });
    });
  }, [episodes]);

  return (
    <div className="ui center aligned grid locations-container">
      {episodes.map((episode) => (
        <div key={episode.id} className="ui card">
          <div className="content">
            <div className="header">
              {episode.name} ({episode.episode})
            </div>
            <div className="description">
              <p>Air date: {episode.air_date}</p>
              <p>
                Characters:{" "}
                {episode.characters.map((characterUrl) => {
                  const characterId = characterUrl.split("/").pop();
                  const characterName = characterNames[characterId];
                  return (
                    <span key={characterId}>
                      {characterName ? characterName : characterUrl}
                      <br />
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Episodes;
