// ContractsGraph.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ContractsGraph = ({ selectedNode }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!selectedNode) return;

    console.log('Rendering contracts graph for selected node:', selectedNode);

    const width = 800;
    const height = 500;
    const radius = 10;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.call(d3.zoom().transform, d3.zoomIdentity);

    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Extract unique suppliers from contracts
    const suppliers = Array.from(new Set(selectedNode.contracts.map(contract => contract.supplier)));

    // Create nodes for contracts only (exclude parent node)
    const nodes = selectedNode.contracts.map(contract => ({
      id: `contract-${contract.id}`, // Unique ID for each contract
      contractName: contract.contractName,
      startDate: contract.startDate,
      endDate: contract.endDate,
      value: contract.value,
      supplier: contract.supplier,
    }));

    // Create links between contracts with the same supplier
    const links = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].supplier && nodes[j].supplier && nodes[i].supplier === nodes[j].supplier) {
          links.push({
            source: nodes[i].id,
            target: nodes[j].id,
          });
        }
      }
    }

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(50))
      .force('charge', d3.forceManyBody().strength(-250))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', 1);

    const node = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', radius) // Fixed radius for contract nodes
      .style('fill', 'blue') // Blue color for contract nodes
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('title')
      .text(d => `${d.contractName}\n${d.startDate} - ${d.endDate}`); // Display contract details

    const label = svg.selectAll('.label')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .attr('dy', -15) // Adjust label position
      .style('font-size', '10px')
      .text(d => d.contractName); // Display contract name

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

    return () => {
      svg.selectAll('*').remove();
    };
  }, [selectedNode]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default ContractsGraph;
