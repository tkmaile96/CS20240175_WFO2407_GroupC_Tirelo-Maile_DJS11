import React, { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import headphones from '../assets/streaming.png';  // logo image


const Header = ({ onSearch, onGenreChange}) => {

    const [genres, setGenres] = useState([]); // Initialize an empty array to store genres
    const [searchTerm, setSearchTerm] = useState(''); // Initialize an empty string to store the search term
    const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

    //Fetch Genres from the API
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch ('https://podcast-api.netlify.app') // Make a GET request to the API
                const data = await response.json(); // Parse the response data as JSON

                //Get the unique genres from the API
                const allGenres = data.flatMap((show) => show.genre); // Flatten the array of genres
                const uniqueGenres = [...new Set(allGenres)].sort(); // Remove duplicates by converting to a Set and sort the array
                setGenres(uniqueGenres); // Update the genres state with the unique genres
            } catch(error) {
                console.error("Error fetching Genres", error); // Log any errors that occur during the fetch
            }
        };
        fetchGenres(); // Call the fetchGenres function to fetch the genres
    }, []); // The dependency array is empty, so this effect will only run once when the component mounts

    //Function to handle the search Input
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Update the search term state with the current input value
        if (onSearch) onSearch(value); // Call the onSearch function with the current search term
    }

    // Handle genre selection
  const handleGenreSelect = (e) => {
    const genre = e.target.value;
    if (onGenreChange) onGenreChange(genre);
  };

    return (
        <header>
            <div className="header-container">
                {/* Logo and Navigation Links */}
                <div className="header-logo" onClick={() => navigate("/")}>
                    <img src={headphones} alt="logo image" className='logo' />
                    <span className="app-name">Podcastify</span>
                </div>

                {/* Search Bar */}
                <div className="header-search">
                    <input 
                        type="text"
                        placeholder="Search for shows"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>

                {/* Filter By Genre */}
                <div className="header-genre">
          <select onChange={handleGenreSelect} className="genre-select">
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
                
            ))}
          </select>
        </div>

                {/* Navigation Links */}
                <div className="header-links">
                    <Link to="/" className="nav-link">
                    Home
                    </Link>
                    <Link to="/favorites" className="nav-link">
                    Favorites
                    </Link>
                </div>
            </div>
        </header>
    );
};
export default Header;