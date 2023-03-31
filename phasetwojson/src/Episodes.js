import React, { useState, useEffect } from "react";

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
    return <div>Loading...</div>;
  }

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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Episodes;
