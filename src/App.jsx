import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home"; // Correct if Home.jsx is in src/
import "./components/Styles/global.css"; // Adjusted path for global.css
import Header from "./components/Header"; // Correct path for Header.jsx
import Sidebar from "./components/Sidebar"; // Correct path for Sidebar.jsx
import ShowDetails from "./components/Pages/ShowDetails"; // Correct if ShowDetails.jsx is in components/Pages/
import Favorites from "./components/Pages/Favorites"; // Correct if Favorites.jsx is in components/Pages/


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <Router>
      <Header
        onSearch={(term) => setSearchTerm(term)}
        onGenreChange={(genre) => setSelectedGenre(genre)}
      />
      <Sidebar />
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



export default App;
