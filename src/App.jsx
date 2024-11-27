import React, { useState } from 'react'; // Import useState and useEffect from React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Link from react-router-dom
import Header from './components/Header;' // import Header component



const App = () => {
 
  const [searchTerm, setSearchTerm] = useState(""); // initialise state variable for search term
  const [selectedGenre, setSelectedGenre] = useState(""); // initialise state variable for selected genre

  return (
  <Router>
    <Header 
    onSearch={(term) =>setSearchTerm(term)}
    onGenreChange={(genre) => setSelectedGenre(genre)}
    />

<Routes>
        <Route
          path="/"
          element={
            <Home searchTerm={searchTerm} selectedGenre={selectedGenre} />
          }
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
  </Router>   
  );
};

export default App
