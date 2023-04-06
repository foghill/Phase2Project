# Rick and Morty Wikipedia

This web app serves as a comprehensive and user-friendly interface for exploring the world of the popular TV show Rick and Morty. It allows users to search and browse various aspects of the show, including character information, locations, and episode details.

## Rick and Morty API

All data is fetched from the [Rick and Morty API](https://rickandmortyapi.com/), which provides extensive information about the show's characters, locations, and episodes.

The API is called within the App.js file using the useEffect hook and an [Immediately Invoked Function Expression](https://www.javascripttutorial.net/javascript-immediately-invoked-function-expression-iife/)

The API returns three important resources in the object: Characters, Locations, Episodes.

The API's response is paginated, returning 20 records per page. The Pagination npm package is used to facilitate navigation and handling of paginated data.

## Key Dependencies

[Semantic](https://semantic-ui.com/)

[React-Router-DOM](https://www.npmjs.com/package/react-router-dom)

[React Paginate](https://www.npmjs.com/package/react-paginate)

Paginate is an awesome package which helps create a page navigation bar

## App Structure and Components

The web app is split up across a few different components including but not limited to:

### Homepage

The Homepage serves as the main entry point for the app and primarily focuses on character information. It features a Filter component that enables users to filter characters based on their status, species, and gender.

A Navbar provides access to additional components, such as Episode and Location pages.

A Searchbar component allows users to search for specific characters throughout the entire dataset..

### App.js Component

The App.js component serves as the main application component, managing state and providing routing for the various other components within the app.

### CharacterContainer Component

The CharacterContainer component is responsible for displaying a grid of character cards based on the provided search term and handling pagination.

javascript

### Character Cards

Clicking on a character displays a detailed Character Card, which includes dynamic elements such as a colored button indicating the character's current status (green for alive, red for dead). Other attributes displayed on the card include Gender, Origin, Location, and Species.

### Episode Page

The Episode page offers a left-hand side accordion menu listing all 51 episodes. When an episode is selected, the page displays the characters that appear in that particular episode. Users can access individual Character Cards through this interface as well.

### Location Page

Similar to the Episode page, the Location page features a left-hand side accordion menu listing all 126 known locations in the series. Upon selecting a location, the page populates with the characters currently residing in that particular location. Users can access individual Character Cards directly from this view.

By leveraging these components, the Rick and Morty Encyclopedia offers an intuitive and engaging way for fans to explore and learn about their favorite show.
