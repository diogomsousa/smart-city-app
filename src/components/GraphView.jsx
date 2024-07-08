import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function GraphView({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Use D3 to create your graph here
    // For example:
    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => i * 100 + 50)
      .attr('cy', 50)
      .attr('r', d => d.price / 10)
      .attr('fill', 'steelblue');

  }, [data]);

  return (
    <svg ref={svgRef} width="500" height="100"></svg>
  );
}

export default GraphView;
