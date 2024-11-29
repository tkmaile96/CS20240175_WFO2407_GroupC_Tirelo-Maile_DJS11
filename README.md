# 🎵 PODCAST APP | PORTFOLIO PIECE 💿
A react-based podcast application

-------
## Features

- **Alphabetical Organisation**: sort Alphabetically and sort using last update date.
- **Detailed Podcast Data**: View details of each show.
- **Theme Change**: Change between dark and Light mode.

------
## Data Structure

### Entities
1. **SHOW**: Represents a podcast show with details like title, description, etc.
2. **SEASON**: Represents the seasons of a podcast show.
3. **EPISODE**: Represents individual episodes of a podcast.
4. **PREVIEW**: Contains brief metadata about podcast shows.
5. **GENRE**: Represents the categories or genres of podcasts.
-------
## API Endpoints

The app fetches podcast data from the following endpoints:

- **Preview Data**: [https://podcast-api.netlify.app](https://podcast-api.netlify.app)
- **Genre Data**: `https://podcast-api.netlify.app/genre/<ID>`
- **Show Details**: `https://podcast-api.netlify.app/id/<ID>`

------
## Installation

1. Clone the repository:
	bash
  - git clone <repository-url>
2. Navigate to folder
  - cd podcast-app
3. Install dependecies
   - npm install
4. Start server
   - npm start

## Technologies

- **React**: front-end framework
- **API intergration**: fetching data dynamically

## How to Use

1. **Homepage**
   - Select a random show and see details and seasons
  
2. **Sidebar**
   - Arrange shows from A-Z or Z-A and also arrange from newly updated to old updates.

## Enhancement
1. Make the Application fully responsive in all screen sizes
2. Be able to toggle sidebar
3. fetch Genres with their titles
4. Be able to add more than one episode to favorites

## License
This project is licensed under the MIT License.

** 
Let me know if you'd like to add any other details or sections!
**


  
   








