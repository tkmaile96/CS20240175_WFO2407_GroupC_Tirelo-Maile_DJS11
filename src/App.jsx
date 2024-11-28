import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // import BrowserRouter and Routes from react-router-dom
import Home from "./Home"; // import Home component
import "./components/Styles/global.css"; // import global.css
import Header from "./components/Header"; // import Header component
// import Sidebar from "./components/Sidebar"; // import Sidebar component
import ShowDetails from "./components/Pages/ShowDetails"; // import ShowDetails component
import Favorites from './components/Pages/Favorites' // import Favorites component


const App = () => {
  const [searchShow, setSearchTerm] = useState(""); // declare state variable searchTerm and initialize it with an empty string
  const [selectGenre, setSelectedGenre] = useState(""); // declare state variable selectedGenre and initialize it with an empty string

  return (
    <Router>
      <Header
        onSearch={(term) => setSearchTerm(term)}
        onGenreChange={(genre) => setSelectedGenre(genre)}
      />
      
      <Routes>
        <Route
          path="/"
          element={
            <Home searchTerm={searchShow} selectedGenre={selectGenre} />
          }
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
};



export default App;
