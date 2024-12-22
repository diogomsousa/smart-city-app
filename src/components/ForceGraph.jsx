import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import { fetchChargingStations, fetchVehicles, fetchExperiences } from '../services/api';

const ForceGraph = ({ zoomLevel, selectedFeedback, onNodeClick, onLinkClick, selectedDistance }) => {
  const svgRef = useRef();
  const [stations, setStations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.8, // 80% of the window width
    height: window.innerHeight * 0.8 // 80% of the window height
  });

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stationData, vehicleData, experienceData] = await Promise.all([
          fetchChargingStations(),
          fetchVehicles(),
          fetchExperiences(),
        ]);
        setStations(stationData);
        setVehicles(vehicleData);
        setExperiences(experienceData);
      } catch (error) {
        console.error('Error loading data', error);
      }
    };
    loadData();
  }, []);

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;

    let filteredStations = stations;

    if (selectedNode && selectedNode.type === 'vehicle') {
      const selectedVehicle = selectedNode;
      const maxDistance = 200; // Set your distance threshold, e.g., 200km

      filteredStations = stations.filter(station => {
        const distance = haversineDistance(
          selectedVehicle.latitude,
          selectedVehicle.longitude,
          station.latitude,
          station.longitude
        );
        return distance <= maxDistance; // Keep stations within the maxDistance
      });
    }

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Combine stations and vehicles into a single nodes array
    const nodes = [
      ...filteredStations.map(station => ({
        ...station,
        id: `station_${station.id}`,  // Prefix station IDs
        type: 'station', // Indicate it's a station node
        color: 'red', // Color for stations
        label: `${station.locationType} (${station.zipCode})`,
        originalRadius: 10,  // Base radius for stations
      })),
      ...vehicles.map(vehicle => ({
        ...vehicle,
        id: `vehicle_${vehicle.id}`,  // Prefix vehicle IDs
        type: 'vehicle', // Indicate it's a vehicle node
        color: 'blue', // Color for vehicles
        label: `${vehicle.brand} ${vehicle.model}`
      })),
    ];

    // Create links based on connector type matching and Experience feedback
    const links = [];

    vehicles.forEach(vehicle => {
      filteredStations.forEach(station => {
        if (vehicle.connectorType.toLowerCase() === station.connectorType.toLowerCase()) {
          // Find the experiences related to the vehicle and station
          const relatedExperiences = experiences.filter(exp =>
            exp.vehicle.id === vehicle.id && exp.chargingStation.id === station.id
          );

          // Count the number of positive and negative feedbacks
          const positiveFeedbacks = relatedExperiences.filter(exp => exp.feedback === true).length;
          const negativeFeedbacks = relatedExperiences.filter(exp => exp.feedback === false).length;

          // Determine link color
          let linkColor = '#999'; // Default to neutral gray if no feedback or positive and negative feedbacks are equal

          if (positiveFeedbacks > negativeFeedbacks) {
            linkColor = 'green'; // More positive feedbacks, use green
          } else if (negativeFeedbacks > positiveFeedbacks) {
            linkColor = 'red'; // More negative feedbacks, use red
          }

          // Add the link to the array with the correct color
          links.push({
            source: `vehicle_${vehicle.id}`,
            target: `station_${station.id}`,
            color: linkColor, // Assign the color based on feedback counts
          });
        }
      });
    });

    // Apply the feedback filter
    const filteredLinks = links.filter(link => {
      if (selectedFeedback.positive && selectedFeedback.negative) {
        return true;
      } else if (selectedFeedback.positive) {
        return link.color === 'green';
      } else if (selectedFeedback.negative) {
        return link.color === 'red';
      } else {
        return true;
      }
    });

    // Filter nodes and links based on the selected node
    let filteredNodes = nodes;
    let filteredLinksData = filteredLinks;

    if (selectedNode) {
      // Get the selected node's id and filter connected nodes and links
      const selectedNodeId = selectedNode.id;
      const connectedNodes = new Set();

      filteredLinks.forEach(link => {
        if (link.source === selectedNodeId || link.target === selectedNodeId) {
          connectedNodes.add(link.source);
          connectedNodes.add(link.target);
        }
      });

      filteredNodes = nodes.filter(node => {
        return filteredNodeIds.has(node.id) || links.every(link => link.source !== node.id && link.target !== node.id);
      });
      filteredLinksData = filteredLinks.filter(link => connectedNodes.has(link.source) && connectedNodes.has(link.target));
    }

    // Now filter the nodes based on whether they have any remaining valid connections
    const filteredNodeIds = new Set();
    filteredLinksData.forEach(link => {
      filteredNodeIds.add(link.source);
      filteredNodeIds.add(link.target);
    });

    // Filter out the nodes that do not have any valid links
    filteredNodes = nodes.filter(node => filteredNodeIds.has(node.id) || links.every(link => link.source !== node.id && link.target !== node.id));

    const simulation = d3.forceSimulation(filteredNodes)
      .force('link', d3.forceLink(filteredLinksData).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300)) // Increase repulsion strength
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(20)); // Prevent overlap


    // Render links with the color logic and thicker edges for green or red links
    const link = svg.selectAll('.link')
      .data(filteredLinksData)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', d => d.color)  // Use the color from the link data
      .style('stroke-opacity', 0.6)
      .style('stroke-width', d => d.color === 'green' || d.color === 'red' ? 4 : 2);  // Thicker edges for green or red links

    link.on('click', (event, d) => {
      // Call the parent callback function with the link data
      onLinkClick(d);
    });

    // Render nodes (vehicles and stations)
    const node = svg.selectAll('.node')
      .data(filteredNodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', d => d.type === 'station' ? d.originalRadius : 10)  // Set radius based on node type and linked vehicles
      .style('fill', d => d.color)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        setSelectedNode(d);  // Set the clicked node as the selected node
        onNodeClick(d);  // Call the onNodeClick function passed from parent
      });

    node.append('title')
      .text(d => d.label);

    // Add labels for nodes
    const label = svg.selectAll('.label')
      .data(filteredNodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .attr('dy', 25)
      .style('font-size', '10px')
      .text(d => d.label);

    // Update positions during simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      label
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = Math.max(10, Math.min(width - 10, event.x));
      d.fy = Math.max(10, Math.min(height - 10, event.y));
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      svg.selectAll('*').remove();
    };
  }, [stations, vehicles, experiences, zoomLevel, selectedFeedback, onNodeClick, onLinkClick, selectedNode, dimensions]);

  return (
    <div>
      <svg ref={svgRef}></svg>

      {/* Render the "Back" button if a node is selected */}
      {selectedNode && (
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',  // Move the button to the right
            zIndex: 10
          }}
          onClick={() => setSelectedNode(null)} // Reset the selected node when the button is clicked
        >
          Back
        </button>
      )}
    </div>
  );
};

export default ForceGraph;