import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // import BrowserRouter and Routes from react-router-dom
import Home from "./Home"; // import Home component
import "./components/Styles/Home.css"; // import Home.css
import Header from "./components/Header"; // import Header component
// import Sidebar from "./components/Sidebar"; // import Sidebar component
import Seasons from "./components/Pages/Seasons"; // import ShowDetails component
import Favorites from './components/Pages/Favorites' // import Favorites component


const App = () => {
  const [searchShow, setSearchShow] = useState(""); // declare state variable searchTerm and initialize it with an empty string
  const [selectGenre, setSelectGenre] = useState(""); // declare state variable selectedGenre and initialize it with an empty string

  return (
    <Router>
      <Header
        onSearch={(show) => setSearchShow(show)}
        onGenreChange={(genre) => setSelectGenre(genre)}
      />
      
      <Routes>
        <Route
          path="/"
          element={
            <Home searchShow={searchShow} selectGenre={selectGenre} />
          }
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/show/:id" element={<Seasons />} />
      </Routes>
    </Router>
  );
};



export default App;
