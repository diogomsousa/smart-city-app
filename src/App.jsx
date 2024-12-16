import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AddEntity from "./pages/AddEntity";
import Experience from "./pages/Experience";
import ViewEntities from "./pages/ViewEntities";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-entity" element={<AddEntity />} />
        <Route path="/view-entities" element={<ViewEntities />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </Router>

  );
}

export default App;
