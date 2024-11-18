import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AddEntity from "./pages/AddEntity";
import ListStations from "./pages/ListStations";
import Experience from "./pages/Experience";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-entity" element={<AddEntity />} />
        <Route path="/list-stations" element={<ListStations />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </Router>

  );
}

export default App;
