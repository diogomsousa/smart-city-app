import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ForceGraph = ({ zoomLevel, onNodeClick }) => {
  const svgRef = useRef();
  const tooltipRef = useRef(null);
  const [stations, setStations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.8, // 80% of the window width
    height: window.innerHeight * 0.8 // 80% of the window height
  });

  // Fetch Stations and Vehicles
  useEffect(() => {
    const loadData = async () => {
      try {
        const stationResult = await axios.get("http://localhost:8888/stations");
        const vehicleResult = await axios.get("http://localhost:8888/vehicles");
        setStations(stationResult.data);
        setVehicles(vehicleResult.data);
      } catch (error) {
        console.error("Error loading data", error);
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
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Combine stations and vehicles into a single nodes array
    const nodes = [
      ...stations.map(station => ({
        ...station,
        id: `station_${station.id}`,  // Prefix station IDs
        type: 'station', // Indicate it's a station node
        color: 'red', // Color for stations
        label: station.zipCode
      })),
      ...vehicles.map(vehicle => ({
        ...vehicle,
        id: `vehicle_${vehicle.id}`,  // Prefix vehicle IDs
        type: 'vehicle', // Indicate it's a vehicle node
        color: 'blue', // Color for vehicles
        label: vehicle.brand
      })),
    ];

    // Create links based on connector type matching
    const links = [];

    vehicles.forEach(vehicle => {
      stations.forEach(station => {
        // Debugging to log connectorType comparison
        console.log(`Comparing Vehicle ${vehicle.id} connectorType: ${vehicle.connectorType} with Station ${station.id} connectorType: ${station.connectorType}`);

        if (vehicle.connectorType.toLowerCase() === station.connectorType.toLowerCase()) {
          console.log(`Linking Vehicle ${vehicle.id} with Station ${station.id}`); // Log if a link is created
          links.push({
            source: `vehicle_${vehicle.id}`,  // Vehicle as the source
            target: `station_${station.id}`   // Station as the target
          });
        }
      });
    });

    // If links are empty, log a message
    if (links.length === 0) {
      console.log("No links created. Check connectorType values.");
    }

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Ensure that links are rendered with a visible style
    const link = svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#999')  // Set a visible color
      .style('stroke-opacity', 0.6)
      .style('stroke-width', 2);

    // Create nodes (vehicles and stations)
    const node = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 10)
      .style('fill', d => d.color)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      .on('click', (event, d) => onNodeClick(d));

    node.append('title')
      .text(d => d.label);

    // Add labels for nodes
    const label = svg.selectAll('.label')
      .data(nodes)
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

    function handleMouseOver(event, d) {
      // Set the tooltip opacity and position
      d3.select(tooltipRef.current)
        .transition()
        .duration(200)
        .style('opacity', 1);

      // Conditional logic to handle different node types (station or vehicle)
      let tooltipContent = `<strong>${d.label}</strong><br/>`;

      if (d.type === 'station') {
        tooltipContent += `Location Type: ${d.locationType}<br/>Zip Code: ${d.zipCode}<br/>Connector Type: ${d.connectorType}`;
      } else if (d.type === 'vehicle') {
        tooltipContent += `Brand: ${d.brand}<br/>Model: ${d.model}<br/>Connector Type: ${d.connectorType}`;
      }

      // Set the tooltip content and position
      d3.select(tooltipRef.current)
        .html(tooltipContent)
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 40}px`);
    }

    function handleMouseOut() {
      d3.select(tooltipRef.current)
        .transition()
        .duration(500)
        .style('opacity', 0);
    }

    return () => {
      svg.selectAll('*').remove();
    };
  }, [stations, vehicles, zoomLevel, onNodeClick, dimensions]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} style={{
        position: 'absolute',
        textAlign: 'center',
        width: '120px',
        height: '60px',
        padding: '2px',
        font: '12px sans-serif',
        background: 'lightsteelblue',
        border: '0px',
        borderRadius: '8px',
        pointerEvents: 'none',
        opacity: 0
      }}></div>
    </div>
  );
};

export default ForceGraph;
