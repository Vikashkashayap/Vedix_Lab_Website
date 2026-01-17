import React, { useEffect, useRef, useState } from 'react';

interface GridNode {
  x: number;
  y: number;
  id: number;
  active: boolean;
  pulsePhase: number;
  connections: number[];
  energy: number;
  signalStrength: number;
  lastActivated: number;
}

interface GridConnection {
  from: number;
  to: number;
  active: boolean;
  morphPhase: number;
  strength: number;
  dataFlow: number;
  pulseSpeed: number;
}

interface SignalPulse {
  id: number;
  startNode: number;
  endNode: number;
  progress: number;
  speed: number;
  strength: number;
  color: string;
}

interface EnergyOrb {
  id: number;
  x: number;
  y: number;
  radius: number;
  growth: number;
  life: number;
  maxLife: number;
  color: string;
}

const AnimatedGrid: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<GridNode[]>([]);
  const [connections, setConnections] = useState<GridConnection[]>([]);
  const [signalPulses, setSignalPulses] = useState<SignalPulse[]>([]);
  const [energyOrbs, setEnergyOrbs] = useState<EnergyOrb[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const pulseIdRef = useRef(0);
  const orbIdRef = useRef(0);

  // Initialize grid network
  useEffect(() => {
    const initializeGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Create nodes in a grid pattern with some randomness
      const cols = Math.floor(width / 120) + 1;
      const rows = Math.floor(height / 120) + 1;
      const newNodes: GridNode[] = [];
      const newConnections: GridConnection[] = [];

      let nodeId = 0;

      // Create grid nodes
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = (col * width) / (cols - 1);
          const baseY = (row * height) / (rows - 1);

          // Add some organic randomness to node positions
          const offsetX = (Math.random() - 0.5) * 40;
          const offsetY = (Math.random() - 0.5) * 40;

          newNodes.push({
            x: Math.max(20, Math.min(width - 20, baseX + offsetX)),
            y: Math.max(20, Math.min(height - 20, baseY + offsetY)),
            id: nodeId,
            active: Math.random() > 0.7, // Some nodes start active
            pulsePhase: Math.random() * Math.PI * 2,
            connections: [],
            energy: Math.random() * 0.5 + 0.5,
            signalStrength: Math.random() * 0.8 + 0.2,
            lastActivated: 0
          });

          nodeId++;
        }
      }

      // Create neural network connections
      const maxConnections = Math.min(8, Math.floor(newNodes.length * 0.15));

      for (let i = 0; i < newNodes.length; i++) {
        const node = newNodes[i];
        const possibleConnections = newNodes
          .filter(n => n.id !== node.id)
          .map(n => ({
            node: n,
            distance: Math.sqrt(Math.pow(n.x - node.x, 2) + Math.pow(n.y - node.y, 2))
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, maxConnections);

        // Connect to 2-4 nearest neighbors
        const connectionCount = Math.floor(Math.random() * 3) + 2;

        for (let j = 0; j < Math.min(connectionCount, possibleConnections.length); j++) {
          const targetNode = possibleConnections[j].node;
          const connectionExists = newConnections.some(
            conn => (conn.from === node.id && conn.to === targetNode.id) ||
                   (conn.from === targetNode.id && conn.to === node.id)
          );

          if (!connectionExists) {
          newConnections.push({
            from: node.id,
            to: targetNode.id,
            active: Math.random() > 0.6,
            morphPhase: Math.random() * Math.PI * 2,
            strength: Math.random() * 0.5 + 0.3,
            dataFlow: Math.random() * 0.3,
            pulseSpeed: 0.01 + Math.random() * 0.02
          });

            node.connections.push(targetNode.id);
          }
        }
      }

      setNodes(newNodes);
      setConnections(newConnections);
      setDimensions({ width, height });
    };

    initializeGrid();

    const handleResize = () => {
      initializeGrid();
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation loop for morphing and pulsing
  useEffect(() => {
    let time = 0;

    const animate = () => {
      time += 0.008; // Very slow morphing

      setNodes(prevNodes =>
        prevNodes.map(node => {
          // Enhanced position morphing with mouse influence
          const baseMorphX = Math.sin(time * 0.5 + node.id * 0.1) * 2;
          const baseMorphY = Math.cos(time * 0.3 + node.id * 0.15) * 2;

          // Mouse influence on nearby nodes
          const distanceToMouse = Math.sqrt(
            Math.pow(mousePos.x - node.x, 2) + Math.pow(mousePos.y - node.y, 2)
          );
          const mouseInfluence = Math.max(0, 1 - distanceToMouse / 200);
          const mouseMorphX = (mousePos.x - node.x) * mouseInfluence * 0.02;
          const mouseMorphY = (mousePos.y - node.y) * mouseInfluence * 0.02;

          // Enhanced pulse animation
          const pulseIntensity = Math.sin(time * 2 + node.pulsePhase) * 0.4 + 0.6;
          const energyLevel = Math.sin(time * 1.5 + node.id * 0.2) * 0.3 + 0.7;

          // Node activation logic
          const shouldActivate = pulseIntensity > 0.8 || mouseInfluence > 0.3 ||
                               (Date.now() - node.lastActivated) > (3000 + Math.random() * 5000);

          if (shouldActivate && !node.active) {
            // Create energy orb when node activates
            const newOrb: EnergyOrb = {
              id: orbIdRef.current++,
              x: node.x,
              y: node.y,
              radius: 0,
              growth: 0.5 + Math.random() * 1,
              life: 0,
              maxLife: 60 + Math.random() * 60,
              color: Math.random() > 0.5 ? '#E10600' : '#FFFFFF'
            };
            setEnergyOrbs(prev => [...prev.slice(-10), newOrb]);
          }

          return {
            ...node,
            x: node.x + baseMorphX + mouseMorphX,
            y: node.y + baseMorphY + mouseMorphY,
            active: shouldActivate,
            energy: energyLevel,
            signalStrength: pulseIntensity,
            lastActivated: shouldActivate ? Date.now() : node.lastActivated
          };
        })
      );

      setConnections(prevConnections =>
        prevConnections.map(connection => {
          // Enhanced connection morphing
          const morphStrength = Math.sin(time * 0.8 + connection.morphPhase) * 0.25 + 0.5;
          const morphActive = Math.sin(time * 0.6 + connection.morphPhase * 2) > 0.1;

          // Data flow animation
          const dataFlowProgress = (time * connection.pulseSpeed + connection.morphPhase) % (Math.PI * 2);
          const flowStrength = Math.sin(dataFlowProgress) * 0.5 + 0.5;

          return {
            ...connection,
            active: morphActive,
            strength: Math.max(0.1, Math.min(1, connection.strength + morphStrength * 0.1)),
            dataFlow: flowStrength
          };
        })
      );

      // Update signal pulses
      setSignalPulses(prevPulses =>
        prevPulses
          .map(pulse => ({
            ...pulse,
            progress: pulse.progress + pulse.speed
          }))
          .filter(pulse => pulse.progress < 1)
      );

      // Update energy orbs
      setEnergyOrbs(prevOrbs =>
        prevOrbs
          .map(orb => ({
            ...orb,
            radius: orb.radius + orb.growth,
            life: orb.life + 1
          }))
          .filter(orb => orb.life < orb.maxLife)
      );

      // Randomly create signal pulses
      if (Math.random() > 0.95 && nodes.length > 1 && connections.length > 0) {
        const activeConnections = connections.filter(c => c.active);
        if (activeConnections.length > 0) {
          const randomConnection = activeConnections[Math.floor(Math.random() * activeConnections.length)];
          const startNode = nodes.find(n => n.id === randomConnection.from);
          const endNode = nodes.find(n => n.id === randomConnection.to);

          if (startNode && endNode) {
            const newPulse: SignalPulse = {
              id: pulseIdRef.current++,
              startNode: randomConnection.from,
              endNode: randomConnection.to,
              progress: 0,
              speed: 0.02 + Math.random() * 0.03,
              strength: randomConnection.strength,
              color: Math.random() > 0.5 ? '#E10600' : '#FFFFFF'
            };
            setSignalPulses(prev => [...prev.slice(-15), newPulse]);
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, mousePos, nodes, connections]);

  // Generate curved path between two nodes
  const generateConnectionPath = (fromNode: GridNode, toNode: GridNode, connection: GridConnection): string => {
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Create a gentle curve
    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2;

    // Add subtle wave to the connection
    const waveOffset = Math.sin(connection.morphPhase + Date.now() * 0.001) * 10;
    const controlX = midX + (dy / distance) * waveOffset;
    const controlY = midY - (dx / distance) * waveOffset;

    return `M ${fromNode.x} ${fromNode.y} Q ${controlX} ${controlY} ${toNode.x} ${toNode.y}`;
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ width: '100%', height: '100%', maxWidth: '100vw' }}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(0.3px)', maxWidth: '100vw', overflow: 'hidden' }}
        viewBox={`0 0 ${Math.min(dimensions.width || window.innerWidth, window.innerWidth)} ${Math.min(dimensions.height || window.innerHeight, window.innerHeight)}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle gradients for connections */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E10600" stopOpacity="0" />
            <stop offset="30%" stopColor="#E10600" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="activeConnectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E10600" stopOpacity="0" />
            <stop offset="25%" stopColor="#E10600" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#FF1A0D" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="#E10600" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#E10600" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E10600" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Neural network connections */}
        {connections.map(connection => {
          const fromNode = nodes[connection.from];
          const toNode = nodes[connection.to];

          if (!fromNode || !toNode) return null;

          const isActive = connection.active && (fromNode.active || toNode.active);
          const opacity = (isActive ? connection.strength : connection.strength * 0.4) * connection.dataFlow;
          const strokeWidth = isActive ? 1.5 + connection.dataFlow * 0.5 : 1;

          return (
            <g key={`${connection.from}-${connection.to}`}>
              {/* Main connection */}
              <path
                d={generateConnectionPath(fromNode, toNode, connection)}
                stroke={isActive ? "url(#activeConnectionGradient)" : "url(#connectionGradient)"}
                strokeWidth={strokeWidth}
                fill="none"
                opacity={opacity}
                style={{
                  filter: `drop-shadow(0 0 ${2 + connection.dataFlow * 3}px rgba(225, 6, 0, ${opacity * 0.6}))`,
                  transition: 'opacity 1s ease-out'
                }}
              />

              {/* Data flow effect */}
              {connection.dataFlow > 0.6 && (
                <path
                  d={generateConnectionPath(fromNode, toNode, connection)}
                  stroke="#FFFFFF"
                  strokeWidth="0.5"
                  fill="none"
                  opacity={connection.dataFlow * 0.3}
                  strokeDasharray="2,4"
                  style={{
                    filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))'
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Neural nodes */}
        {nodes.map(node => (
          <g key={node.id}>
            {/* Outer energy field */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.active ? 8 + node.energy * 4 : 5 + node.energy * 2}
              fill="url(#nodeGlow)"
              opacity={node.active ? 0.4 * node.energy : 0.15 * node.energy}
              style={{
                transition: 'all 1s ease-out',
                filter: `blur(${node.active ? 2 : 1}px)`
              }}
            />

            {/* Main node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.active ? 2.5 + node.energy * 0.5 : 1.5 + node.energy * 0.3}
              fill={node.active ? "#E10600" : "#8B8B8F"}
              opacity={node.active ? 0.8 * node.signalStrength : 0.4 * node.signalStrength}
              style={{
                transition: 'all 1s ease-out',
                filter: `drop-shadow(0 0 ${3 + node.energy * 2}px ${node.active ? 'rgba(225, 6, 0, 0.6)' : 'rgba(139, 139, 143, 0.4)'})`
              }}
            />

            {/* Inner energy core */}
            {node.energy > 0.7 && (
              <circle
                cx={node.x}
                cy={node.y}
                r={0.8 + node.energy * 0.4}
                fill="#FFFFFF"
                opacity={node.active ? 0.9 : 0.6}
                style={{
                  filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.9))'
                }}
              />
            )}

            {/* Signal strength indicator */}
            {node.signalStrength > 0.8 && (
              <circle
                cx={node.x}
                cy={node.y}
                r={4 + node.signalStrength * 3}
                fill="none"
                stroke={node.active ? "#E10600" : "#8B8B8F"}
                strokeWidth="0.5"
                opacity={node.signalStrength * 0.3}
                style={{
                  filter: `drop-shadow(0 0 2px ${node.active ? 'rgba(225, 6, 0, 0.4)' : 'rgba(139, 139, 143, 0.3)'})`
                }}
              />
            )}
          </g>
        ))}

        {/* Signal pulses */}
        {signalPulses.map(pulse => {
          const startNode = nodes.find(n => n.id === pulse.startNode);
          const endNode = nodes.find(n => n.id === pulse.endNode);

          if (!startNode || !endNode) return null;

          const currentX = startNode.x + (endNode.x - startNode.x) * pulse.progress;
          const currentY = startNode.y + (endNode.y - startNode.y) * pulse.progress;

          return (
            <g key={pulse.id}>
              {/* Pulse core */}
              <circle
                cx={currentX}
                cy={currentY}
                r={2 + pulse.strength * 2}
                fill={pulse.color}
                opacity="0.9"
                style={{
                  filter: `drop-shadow(0 0 8px ${pulse.color}80)`
                }}
              />

              {/* Pulse glow */}
              <circle
                cx={currentX}
                cy={currentY}
                r={6 + pulse.strength * 4}
                fill={pulse.color}
                opacity="0.3"
                style={{
                  filter: `blur(2px) drop-shadow(0 0 12px ${pulse.color}60)`
                }}
              />

              {/* Inner white core */}
              <circle
                cx={currentX}
                cy={currentY}
                r={1}
                fill="#FFFFFF"
                opacity="1"
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 1))'
                }}
              />
            </g>
          );
        })}

        {/* Energy orbs */}
        {energyOrbs.map(orb => (
          <g key={orb.id}>
            {/* Outer glow */}
            <circle
              cx={orb.x}
              cy={orb.y}
              r={orb.radius * 1.5}
              fill={orb.color}
              opacity={(1 - orb.life / orb.maxLife) * 0.2}
              style={{
                filter: `blur(4px) drop-shadow(0 0 16px ${orb.color}40)`
              }}
            />

            {/* Main orb */}
            <circle
              cx={orb.x}
              cy={orb.y}
              r={orb.radius}
              fill={orb.color}
              opacity={(1 - orb.life / orb.maxLife) * 0.6}
              style={{
                filter: `drop-shadow(0 0 8px ${orb.color}80)`
              }}
            />

            {/* Inner core */}
            <circle
              cx={orb.x}
              cy={orb.y}
              r={orb.radius * 0.4}
              fill="#FFFFFF"
              opacity={(1 - orb.life / orb.maxLife) * 0.9}
              style={{
                filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 1))'
              }}
            />
          </g>
        ))}

        {/* Subtle background grid pattern */}
        <defs>
          <pattern id="gridPattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="#8B8B8F"
              strokeWidth="0.5"
              opacity="0.03"
            />
          </pattern>
        </defs>

        {/* Very subtle grid overlay */}
        <rect
          width="100%"
          height="100%"
          fill="url(#gridPattern)"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export default AnimatedGrid;
