import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

const Graph = () => {
  const container = useRef(null);

  const nodes = [
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' },
    { id: 6, label: 'Node 6' },
  ];

  const edges = [
    { from: 1, to: 1 },
    { from: 2, to: 1 },
    { from: 3, to: 1 },
    { from: 4, to: 1 },
    { from: 5, to: 1 },
    { from: 6, to: 1 }
  ];

  const options = {};

  useEffect(() => {
    const network =
      container.current &&
      new Network(container.current, { nodes, edges }, options);
  }, [container, nodes, edges]);

  return <div ref={container} style={{ height: '100px', width: '800px' }} />;
};

export default Graph;
