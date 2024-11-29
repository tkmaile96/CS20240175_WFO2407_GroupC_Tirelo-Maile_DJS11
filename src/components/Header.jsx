import React, { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import headphones from '../assets/streaming.png';  // logo image
import User from '../assets/user.png' // user image
import HomeImage from '../assets/home.png'; // home image
import favoriteImage from '../assets/star.png' ; // favorite image
import Theme from '../assets/day-and-night.png'; // theme image
import './Header.css'; // Import CSS file


const Header = ({ onSearch, onGenreChange}) => {

    // const { id } = useParams(); // Get the id from the URL
    const [genres, setGenres] = useState([]); // Initialize an empty array to store genres
    const [searchShow, setSearchShow] = useState(''); // Initialize an empty string to store the search term
    const navigate = useNavigate(); // Initialize the navigate function from react-router-dom
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light"); // Get the theme from local storage or set it to light by default

    //Fetch Genres from the API
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch ('https://podcast-api.netlify.app') // Make a GET request to the API
                const data = await response.json(); // Parse the response data as JSON

                //Get the unique genres from the API
                const allGenres = data.flatMap((show) => show.genres); // Flatten the array of genres
                const uniqueGenres = [...new Set(allGenres)].sort(); // Remove duplicates by converting to a Set and sort the array
                setGenres(uniqueGenres); // Update the genres state with the unique genres
            } catch(error) {
                console.error("Try Again Later.", error); // Log any errors that occur during the fetch
            }
        };
        fetchGenres(); // Call the fetchGenres function to fetch the genres
    }, []); // The dependency array is empty, so this effect will only run once when the component mounts

    //Function to handle the search Input
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchShow(value); // Update the search term state with the current input value
        if (onSearch) onSearch(value); // Call the onSearch function with the current search term
    }

    // Handle genre selection
  const handleGenreSelect = (e) => {
    const genre = e.target.value;
    if (onGenreChange) onGenreChange(genre);
  };

  //Change theme
  const changeTheme = () => {
    const currentTheme = theme === "light" ? "dark" : "light"; // Switch themes
    setTheme(currentTheme); // Update the theme state with the new theme
    localStorage.setItem("theme", currentTheme); // Save the new theme to local storage
    document.body.className = currentTheme; // Update the body class to match the new theme
  };
  useEffect(() => {
    document.body.className = theme; // Update the body class to match the current theme
  }, [theme]); // The dependency array includes the theme state, so this effect will run whenever the theme is changed

    return (
        <header className="header">
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
                        value={searchShow}
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
                    <div className="header-user-profile">
                        <img src={HomeImage} alt="Home-icon" />
                    </div>
                    </Link>
                    <Link to="/favorites" className="nav-link">
                    <div className="header-user-profile">
                        <img src={favoriteImage} alt="fav-icon" />
                    </div>
                    </Link>

                    <button onClick={changeTheme} className="change-theme">
                         <img src={Theme} alt="theme-change" />

                </button>
                </div>
            </div>
           
        </header>
    );
};
export default Header;