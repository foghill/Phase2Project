import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom";
import Header from "./Header";
import CharacterForm from "./CharacterForm";
import CharacterContainer from "./CharacterContainer";
import Episodes from "./Episodes";
import LocationsContainer from "./LocationsContainer";
import ErrorPage from "./ErrorPage";
import { v4 as uuidv4 } from "uuid";
import { Container, Menu } from "semantic-ui-react";

const API = "http://localhost:3001/characters";

//potentially do all the destructuring here or in the CharacterCard component

const headers = {
  Accepts: "application/json",
  "Content-Type": "application/json",
};

function App() {
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [locationsPage, setLocationsPage] = useState(1);

  useEffect(() => {
    fetchLocations(locationsPage);
  }, [locationsPage]);

  const handleNextLocationsPage = () => {
    setLocationsPage(locationsPage + 1);
  };

  const handlePrevLocationsPage = () => {
    if (locationsPage > 1) {
      setLocationsPage(locationsPage - 1);
    }
  };

  const fetchLocations = (page) => {
    fetch(`http://localhost:3001/locations?_limit=10&_page=${page}`)
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Fetch locations data from API
    fetch(API)
      .then((res) => res.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.log(error));
  }, []);

  // Fetches locations data from API, sets location data to state

  // useEffect(() => {
  //   // Fetch locations data from API
  //   fetch("http://localhost:3001/locations")
  //     .then((res) => res.json())
  //     .then((data) => setLocations(data))
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const fetchCharacters = (page) => {
    fetch(`${API}?_limit=15&_page=${page}`)
      .then((res) => res.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.log(error));
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  //This function fetches the data from the API and adds the new character to the page

  function handleAddCharacter(newCharacter) {
    // Generate a unique ID for the new character
    const id = uuidv4();

    // Add the ID to the new character object
    const characterWithId = { ...newCharacter, id };

    //Send the new character object to the API using fetch.
    fetch(API, {
      method: "POST",
      headers,
      body: JSON.stringify(characterWithId),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // update characters page with new character
        setCharacters((prevCharacters) => [...prevCharacters, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //This function fetches the data from the API and deletes the character that has been selected with the delete button
  //The function is called when the delete button is clicked and the deleteCharacter function is passed the character ID
  //The fetch function is used to delete the character and the data is then filtered to remove the character that has been deleted

  function deleteCharacter(id) {
    console.log("deleting", id);
    fetch(`${API}/${id}`, {
      //fetch the API and the id of the character to be deleted
      method: "DELETE", //delete the character
      headers, //send the headers
    }).then(
      (data) => setCharacters(characters.filter((char) => char.id !== id)) //filter out existing characters array and we're only including the ones that don't match the id that we just deleted
    );
  }
//This version of the function checks if the likes property exists on the char object, and if it doesn't, it sets it to 0 before incrementing it. This should prevent NaN values from being returned.
  function incrementLikes(char) {
    fetch(`${API}/${char.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ likes: (char.likes || 0) + 1 }),
    }).then(() =>
      setCharacters(
        characters.map((oldChar) =>
          oldChar.id !== char.id
            ? oldChar
            : { ...oldChar, likes: (oldChar.likes || 0) + 1 }
        )
      )
    );
  }
  
  

  return (
    <Router>
      <Header />
      <Menu pointing secondary>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Menu.Item as={Link} to="/" header>
            Characters
          </Menu.Item>
          <Menu.Item as={Link} to="/episodes">
            Episodes
          </Menu.Item>
          <Menu.Item as={Link} to="/locations">
            Locations
          </Menu.Item>
          <Menu.Item as={Link} to="/characterform">
            Add a Character Form
          </Menu.Item>
        </Container>
      </Menu>

      <div className="buttonContainer"></div>
      <Routes>
        <Route
          path="/"
          element={
            <CharacterContainer
              characters={characters}
              handleDelete={deleteCharacter}
              handleClickLikes={incrementLikes}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              currentPage={page}
            />
          }
        />

        <Route path="/episodes" element={<Episodes />} />
        <Route
          path="/locations"
          element={
            <LocationsContainer
              locations={locations}
              onNextPage={handleNextLocationsPage}
              onPrevPage={handlePrevLocationsPage}
              currentPage={locationsPage}
            />
          }
        />

        <Route
          path="/characterform"
          element={
            <CharacterForm
              handleAddCharacter={handleAddCharacter}
              setCharacters={setCharacters}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
