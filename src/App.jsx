import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Import your new Home component
// import ForceGraph from "./components/ForceGraph";
// import CarbonFilter from "./components/CarbonFilter";
// import ContractsGraph from "./components/ContractsForceGraph"; // Import ContractsGraph component
import "./App.css";
// import { useNavigate, Route, Routes } from 'react-router-dom';
import AddStation from "./pages/AddStation";
import ListStations from "./pages/ListStations";

function App() {
  // const [selectedRegions, setSelectedRegions] = useState(new Set());
  // const [selectedEnergyTypes, setSelectedEnergyTypes] = useState(new Set());
  // const [carbonFootprintValue, setCarbonFootprintValue] = useState(0);
  // const [selectedNode, setSelectedNode] = useState(null); // State to track selected node
  // const navigate = useNavigate();

  // const handleRegionChange = (event) => {
  //   const region = event.target.value;
  //   const updatedSelectedRegions = new Set(selectedRegions);
  //   if (updatedSelectedRegions.has(region)) {
  //     updatedSelectedRegions.delete(region);
  //   } else {
  //     updatedSelectedRegions.add(region);
  //   }
  //   setSelectedRegions(updatedSelectedRegions);
  // };

  // const handleEnergyTypeChange = (event) => {
  //   const energyType = event.target.value;
  //   const updatedSelectedEnergyTypes = new Set(selectedEnergyTypes);
  //   if (updatedSelectedEnergyTypes.has(energyType)) {
  //     updatedSelectedEnergyTypes.delete(energyType);
  //   } else {
  //     updatedSelectedEnergyTypes.add(energyType);
  //   }
  //   setSelectedEnergyTypes(updatedSelectedEnergyTypes);
  // };

  // // const handleCarbonFootprintChange = (value) => {
  // //   setCarbonFootprintValue(value);
  // // };

  // const handleNodeClick = (node) => {
  //   setSelectedNode(node);
  // };

  // const handleBackClick = () => {
  //   setSelectedNode(null);
  // };


  // //routes
  // const handleAddStationClick = () => {
  //   navigate('/add-station');
  // }

  // const handleListStationsClick = () => {
  //   navigate('/list-stations');
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-station" element={<AddStation />} />
        <Route path="/list-stations" element={<ListStations />} />
      </Routes>
    </Router>

    // <div className="App">
    //   <div className="sidebar">
    //     <div className="checkbox-container">
    //       <div className="filter-card">
    //         <h2>Filter by Region</h2>
    //         <label>
    //           <input
    //             type="checkbox"
    //             value="North"
    //             onChange={handleRegionChange}
    //           />
    //           Norte
    //         </label>
    //         <label>
    //           <input
    //             type="checkbox"
    //             value="South"
    //             onChange={handleRegionChange}
    //           />
    //           Sul
    //         </label>
    //         <label>
    //           <input
    //             type="checkbox"
    //             value="East"
    //             onChange={handleRegionChange}
    //           />
    //           Este
    //         </label>
    //         <label>
    //           <input
    //             type="checkbox"
    //             value="Oeste"
    //             onChange={handleRegionChange}
    //           />
    //           Oeste
    //         </label>
    //       </div>
    //       <div className="filter-card">
    //         <h2>Filter by Energy Type</h2>
    //         <label>
    //           <input
    //             type="checkbox"
    //             value="Solar"
    //             onChange={handleEnergyTypeChange}
    //           />
    //           Solar
    //         </label>
    //         <label>
    //           <input
    //             type="checkbox"
    //             value="Eólica"
    //             onChange={handleEnergyTypeChange}
    //           />
    //           Eólica
    //         </label>
    //         <label>
    //           <input
    //             type="checkbox"
    //             value="Nuclear"
    //             onChange={handleEnergyTypeChange}
    //           />
    //           Nuclear
    //         </label>
    //         <label>
    //           <input
    //             type="checkbox"
    //             value="Hidrelétrica"
    //             onChange={handleEnergyTypeChange}
    //           />
    //           Hidrelétrica
    //         </label>
    //       </div>
    //       <div className="filter-card">
    //         {/* <CarbonFilter
    //           carbonFootprintValue={carbonFootprintValue}
    //           onChange={handleCarbonFootprintChange}
    //         /> */}
    //       </div>

    //       <div className="filter-card">
    //         <div className="button-sidebar-container">
    //           <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l button-sidebar"
    //             onClick={handleAddStationClick}>
    //             Add Station
    //           </button>
    //           <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l button-sidebar">
    //             Delete Station
    //           </button>
    //           <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
    //             onClick={handleListStationsClick}>
    //             View Stations
    //           </button>
    //         </div>
    //       </div>

    //       {selectedNode && (
    //         <div className="button-container">
    //           <button className="action-button" onClick={handleBackClick}>
    //             Back
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div className="graph-container">
    //     {selectedNode ? (
    //       <ContractsGraph selectedNode={selectedNode} />
    //     ) : (
    //       <ForceGraph
    //         selectedRegions={selectedRegions}
    //         selectedEnergyTypes={selectedEnergyTypes}
    //         carbonFootprintValue={carbonFootprintValue}
    //         onNodeClick={handleNodeClick}
    //       />
    //     )}
    //   </div>
    //   <Routes>
    //     <Route path="/add-station" element={<AddStation />} />
    //     <Route path="/list-stations" element={<ListStations />} />
    //   </Routes>
    // </div>
  );
}

export default App;
