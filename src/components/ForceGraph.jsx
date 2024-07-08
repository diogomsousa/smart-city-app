// ForceGraph.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import dataNodes from './data.json';

const ForceGraph = ({ selectedRegions, selectedEnergyTypes, zoomLevel, onNodeClick }) => {
  const svgRef = useRef();
  const tooltipRef = useRef(null);

  useEffect(() => {
    console.log('Initial graph rendering or filters changed');

    const width = 800;
    const height = 500;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const radius = 10;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.call(d3.zoom().transform, d3.zoomIdentity);

    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
        node.attr('transform', d => `translate(${Math.max(radius, Math.min(width - radius, d.x))},${Math.max(radius, Math.min(height - radius, d.y))})`);
      });

    svg.call(zoom);

    const nodes = dataNodes.map(d => ({ ...d }));

    let nodesCopy = nodes.slice();

    if (selectedRegions.size > 0) {
      nodesCopy = nodesCopy.filter(node => selectedRegions.has(node.region));
    }
    if (selectedEnergyTypes.size > 0) {
      nodesCopy = nodesCopy.filter(node => selectedEnergyTypes.has(node.energyType));
    }

    const nodesByRegion = d3.group(nodesCopy, d => d.region);

    const links = [];
    nodesByRegion.forEach(regionNodes => {
      for (let i = 0; i < regionNodes.length; i++) {
        for (let j = i + 1; j < regionNodes.length; j++) {
          links.push({ source: regionNodes[i].id, target: regionNodes[j].id });
        }
      }
    });

    nodesCopy.forEach(sourceNode => {
      nodesCopy.forEach(targetNode => {
        if (sourceNode.id !== targetNode.id && sourceNode.sustainability.carbonFootprint === 'Low' && targetNode.sustainability.carbonFootprint === 'Low') {
          links.push({ source: sourceNode.id, target: targetNode.id });
        }
      });
    });

    const linksCopy = links.map(d => ({ ...d }));

    linksCopy.forEach(link => {
      link.source = nodesCopy.find(node => node.id === link.source);
      link.target = nodesCopy.find(node => node.id === link.target);
    });

    const simulation = d3.forceSimulation(nodesCopy)
      .force('link', d3.forceLink(linksCopy).id(d => d.id).distance(50))
      .force('charge', d3.forceManyBody().strength(-250))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll('.link')
      .data(linksCopy)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', d => {
        const reverseLinkExists = linksCopy.some(l => l.source === d.target && l.target === d.source);
        if (reverseLinkExists && d.source.sustainability.carbonFootprint === 'Low' && d.target.sustainability.carbonFootprint === 'Low') {
          return 2;
        }
        return 1;
      });

    const node = svg.selectAll('.node')
      .data(nodesCopy)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', radius)
      .style('fill', d => color(d.energyType))
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      .on('click', (event, d) => onNodeClick(d));

    node.append('title')
      .text(d => d.company);

    const label = svg.selectAll('.label')
      .data(nodesCopy)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .attr('dy', 25)
      .style('font-size', '10px')
      .text(d => d.company);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x = Math.max(radius, Math.min(width - radius, d.x)))
        .attr('cy', d => d.y = Math.max(radius, Math.min(height - radius, d.y)));

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
      d.fx = Math.max(radius, Math.min(width - radius, event.x));
      d.fy = Math.max(radius, Math.min(height - radius, event.y));
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function handleMouseOver(event, d) {
      d3.select(tooltipRef.current)
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      d3.select(tooltipRef.current).html(`<strong>${d.company}</strong><br/>Region: ${d.region}<br/>Energy Type: ${d.energyType}<br/>Carbon Footprint: ${d.sustainability.carbonFootprint}`)
        .style('left', `${event.pageX + 5}px`)
        .style('top', `${event.pageY - 28}px`);
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
  }, [selectedRegions, selectedEnergyTypes, zoomLevel, onNodeClick]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} style={{ position: 'absolute', textAlign: 'center', width: '120px', height: '60px', padding: '2px', font: '12px sans-serif', background: 'lightsteelblue', border: '0px', borderRadius: '8px', pointerEvents: 'none', opacity: 0 }}></div>
    </div>
  );
};

export default ForceGraph;
