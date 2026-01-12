import React, { useEffect, useRef, useState } from 'react';

interface Line {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  opacity: number;
  speed: number;
  curvature: number;
  direction: number;
  phase: number;
  length: number;
  nodes: { x: number; y: number }[];
  energy: number;
  pulseOffset: number;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  trail: { x: number; y: number; opacity: number }[];
}

interface DataPacket {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

const AnimatedLines: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const animationRef = useRef<number>();
  const linesRef = useRef<Line[]>([]);
  const particleIdRef = useRef(0);
  const packetIdRef = useRef(0);

  // Initialize lines with AI data stream characteristics
  useEffect(() => {
    const createLines = (): Line[] => {
      const newLines: Line[] = [];
      const colors = ['#E10600', '#FFFFFF', '#8B8B8F']; // Red, white, gray
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Create 8-12 lines with varying characteristics
      for (let i = 0; i < 10; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const baseOpacity = color === '#E10600' ? 0.15 : color === '#FFFFFF' ? 0.08 : 0.12;

        // Create lines that flow in different patterns
        const patterns = [
          // Horizontal flow
          () => ({
            x1: -100,
            y1: Math.random() * viewportHeight,
            x2: viewportWidth + 100,
            y2: Math.random() * viewportHeight,
            direction: 0
          }),
          // Vertical flow
          () => ({
            x1: Math.random() * viewportWidth,
            y1: -100,
            x2: Math.random() * viewportWidth,
            y2: viewportHeight + 100,
            direction: 1
          }),
          // Diagonal flow (top-left to bottom-right)
          () => ({
            x1: -100,
            y1: -100,
            x2: viewportWidth + 100,
            y2: viewportHeight + 100,
            direction: 2
          }),
          // Diagonal flow (top-right to bottom-left)
          () => ({
            x1: viewportWidth + 100,
            y1: -100,
            x2: -100,
            y2: viewportHeight + 100,
            direction: 3
          }),
          // Curved connection pattern
          () => ({
            x1: Math.random() * viewportWidth,
            y1: Math.random() * viewportHeight,
            x2: Math.random() * viewportWidth,
            y2: Math.random() * viewportHeight,
            direction: 4
          })
        ];

        const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
        const length = Math.sqrt(Math.pow(pattern.x2 - pattern.x1, 2) + Math.pow(pattern.y2 - pattern.y1, 2));

        // Create nodes for curved lines
        const nodes = [];
        const nodeCount = Math.floor(Math.random() * 3) + 2; // 2-4 nodes
        for (let j = 0; j < nodeCount; j++) {
          nodes.push({
            x: pattern.x1 + (pattern.x2 - pattern.x1) * (j / (nodeCount - 1)) + (Math.random() - 0.5) * 100,
            y: pattern.y1 + (pattern.y2 - pattern.y1) * (j / (nodeCount - 1)) + (Math.random() - 0.5) * 100
          });
        }

        newLines.push({
          id: i,
          x1: pattern.x1,
          y1: pattern.y1,
          x2: pattern.x2,
          y2: pattern.y2,
          color,
          opacity: baseOpacity,
          speed: 0.3 + Math.random() * 0.4, // Slow, elegant movement
          curvature: Math.random() * 0.5 + 0.2,
          direction: pattern.direction,
          phase: Math.random() * Math.PI * 2,
          length,
          nodes,
          energy: Math.random() * 0.5 + 0.5, // Energy level for dynamic effects
          pulseOffset: Math.random() * Math.PI * 2 // Offset for pulsing animation
        });
      }

      return newLines;
    };

    linesRef.current = createLines();
    setLines(linesRef.current);

    // Handle window resize
    const handleResize = () => {
      linesRef.current = createLines();
      setLines([...linesRef.current]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create floating particle
  const createParticle = (x: number, y: number, color: string): FloatingParticle => {
    return {
      id: particleIdRef.current++,
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 0,
      maxLife: 60 + Math.random() * 120, // 1-3 seconds at 60fps
      color,
      size: Math.random() * 2 + 1,
      trail: []
    };
  };

  // Create data packet
  const createDataPacket = (startX: number, startY: number, endX: number, endY: number, color: string): DataPacket => {
    return {
      id: packetIdRef.current++,
      x: startX,
      y: startY,
      targetX: endX,
      targetY: endY,
      progress: 0,
      speed: 0.01 + Math.random() * 0.02,
      color,
      size: 2 + Math.random() * 2
    };
  };

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Create particle trail on mouse movement
      if (Math.random() > 0.8) { // 20% chance to create particle
        const colors = ['#E10600', '#FFFFFF', '#8B8B8F'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const newParticle = createParticle(e.clientX, e.clientY, color);

        setParticles(prev => {
          const updated: FloatingParticle[] = [...prev, newParticle];
          // Limit particles for performance
          return updated.slice(-50);
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    let time = 0;

    const animate = () => {
      time += 0.016; // ~60fps

      setLines(prevLines =>
        prevLines.map(line => {
          const mouseInfluence = 80; // Increased magnet effect range
          const mouseX = mousePos.x;
          const mouseY = mousePos.y;

          // Calculate mouse influence on line
          const lineCenterX = (line.x1 + line.x2) / 2;
          const lineCenterY = (line.y1 + line.y2) / 2;
          const distanceToMouse = Math.sqrt(
            Math.pow(mouseX - lineCenterX, 2) + Math.pow(mouseY - lineCenterY, 2)
          );

          let mouseEffect = 0;
          let brightnessBoost = 0;
          let energyBoost = 0;

          if (distanceToMouse < mouseInfluence) {
            mouseEffect = (1 - distanceToMouse / mouseInfluence) * 0.5;
            brightnessBoost = (1 - distanceToMouse / mouseInfluence) * 0.6;
            energyBoost = (1 - distanceToMouse / mouseInfluence) * 0.4;
          }

          // Dynamic energy pulsing
          const energyPulse = Math.sin(time * 3 + line.pulseOffset) * 0.3 + 0.7;
          const currentEnergy = Math.max(0.2, Math.min(1, line.energy * energyPulse + energyBoost));

          // Update line position based on direction and mouse influence
          let newX1 = line.x1;
          let newY1 = line.y1;
          let newX2 = line.x2;
          let newY2 = line.y2;

          switch (line.direction) {
            case 0: // Horizontal
              newX1 += line.speed * 2;
              newX2 += line.speed * 2;
              if (newX1 > window.innerWidth + 100) {
                newX1 = -100;
                newX2 = window.innerWidth + 100;
              }
              break;
            case 1: // Vertical
              newY1 += line.speed * 1.5;
              newY2 += line.speed * 1.5;
              if (newY1 > window.innerHeight + 100) {
                newY1 = -100;
                newY2 = window.innerHeight + 100;
              }
              break;
            case 2: // Diagonal TL-BR
              newX1 += line.speed * 1.2;
              newY1 += line.speed * 1.2;
              newX2 += line.speed * 1.2;
              newY2 += line.speed * 1.2;
              if (newX1 > window.innerWidth + 100) {
                newX1 = -100;
                newY1 = -100;
                newX2 = window.innerWidth + 100;
                newY2 = window.innerHeight + 100;
              }
              break;
            case 3: // Diagonal TR-BL
              newX1 -= line.speed * 1.2;
              newY1 += line.speed * 1.2;
              newX2 -= line.speed * 1.2;
              newY2 += line.speed * 1.2;
              if (newX1 < -100) {
                newX1 = window.innerWidth + 100;
                newY1 = -100;
                newX2 = -100;
                newY2 = window.innerHeight + 100;
              }
              break;
            case 4: // Curved connection
              // Add subtle oscillation for curved lines
              const oscillation = Math.sin(time * 0.5 + line.phase) * 20;
              newX1 += Math.sin(time * line.speed + line.phase) * 5;
              newY1 += Math.cos(time * line.speed + line.phase) * 5;
              newX2 += Math.sin(time * line.speed + line.phase + Math.PI) * 5;
              newY2 += Math.cos(time * line.speed + line.phase + Math.PI) * 5;
              break;
          }

          // Apply mouse magnet effect
          if (mouseEffect > 0) {
            const angle = Math.atan2(mouseY - lineCenterY, mouseX - lineCenterX);
            const pushDistance = mouseEffect * 30;
            newX1 += Math.cos(angle) * pushDistance;
            newY1 += Math.sin(angle) * pushDistance;
            newX2 += Math.cos(angle) * pushDistance;
            newY2 += Math.sin(angle) * pushDistance;
          }

          // Update nodes for curved lines
          const updatedNodes = line.nodes.map((node, index) => {
            const baseX = line.x1 + (line.x2 - line.x1) * (index / (line.nodes.length - 1));
            const baseY = line.y1 + (line.y2 - line.y1) * (index / (line.nodes.length - 1));

            // Add wave motion
            const waveOffset = Math.sin(time * 2 + line.phase + index * 0.5) * 15 * line.curvature;

            return {
              x: baseX + waveOffset + (mouseEffect * Math.cos(Math.atan2(mouseY - baseY, mouseX - baseX)) * 20),
              y: baseY + waveOffset + (mouseEffect * Math.sin(Math.atan2(mouseY - baseY, mouseX - baseX)) * 20)
            };
          });

          return {
            ...line,
            x1: newX1,
            y1: newY1,
            x2: newX2,
            y2: newY2,
            opacity: Math.max(0.05, line.opacity * currentEnergy + brightnessBoost),
            energy: currentEnergy,
            nodes: updatedNodes
          };
        })
      );

      // Update particles
      setParticles(prevParticles =>
        prevParticles
          .map(particle => {
            // Update trail
            const newTrail = [
              { x: particle.x, y: particle.y, opacity: 1 },
              ...particle.trail.slice(0, 8).map(t => ({ ...t, opacity: t.opacity * 0.9 }))
            ];

            return {
              ...particle,
              x: particle.x + particle.vx,
              y: particle.y + particle.vy,
              vx: particle.vx * 0.98, // Air resistance
              vy: particle.vy * 0.98 + 0.1, // Gravity
              life: particle.life + 1,
              trail: newTrail
            };
          })
          .filter(particle => particle.life < particle.maxLife && particle.x > -50 && particle.x < window.innerWidth + 50 && particle.y > -50 && particle.y < window.innerHeight + 50)
      );

      // Update data packets
      setDataPackets(prevPackets =>
        prevPackets
          .map(packet => ({
            ...packet,
            progress: Math.min(1, packet.progress + packet.speed),
            x: packet.x + (packet.targetX - packet.x) * packet.speed,
            y: packet.y + (packet.targetY - packet.y) * packet.speed
          }))
          .filter(packet => packet.progress < 1)
      );

      // Randomly create data packets between lines
      if (Math.random() > 0.98 && lines.length > 1) { // 2% chance per frame
        const line1 = lines[Math.floor(Math.random() * lines.length)];
        const line2 = lines[Math.floor(Math.random() * lines.length)];
        if (line1 && line2 && line1.id !== line2.id) {
          const startX = (line1.x1 + line1.x2) / 2;
          const startY = (line1.y1 + line1.y2) / 2;
          const endX = (line2.x1 + line2.x2) / 2;
          const endY = (line2.y1 + line2.y2) / 2;

          const colors = ['#E10600', '#FFFFFF', '#8B8B8F'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          const newPacket = createDataPacket(startX, startY, endX, endY, color);

          setDataPackets(prev => {
            const updated = [...prev, newPacket];
            return updated.slice(-20); // Limit packets
          });
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
  }, [mousePos, lines]);

  // Generate SVG path for curved lines
  const generatePath = (line: Line): string => {
    if (line.direction === 4 && line.nodes.length > 2) {
      // Bezier curve through nodes
      let path = `M ${line.nodes[0].x} ${line.nodes[0].y}`;
      for (let i = 1; i < line.nodes.length - 1; i++) {
        const next = line.nodes[i + 1];
        const current = line.nodes[i];
        const prev = line.nodes[i - 1];

        // Control points for smooth curve
        const cp1x = current.x - (next.x - prev.x) * 0.3;
        const cp1y = current.y - (next.y - prev.y) * 0.3;
        const cp2x = current.x + (next.x - prev.x) * 0.3;
        const cp2y = current.y + (next.y - prev.y) * 0.3;

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
      }
      return path;
    } else {
      // Simple straight line
      return `M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(0.5px)' }}
      >
        <defs>
          {/* Gradient definitions for line effects */}
          <linearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E10600" stopOpacity="0" />
            <stop offset="50%" stopColor="#E10600" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E10600" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="whiteGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="grayGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B8B8F" stopOpacity="0" />
            <stop offset="50%" stopColor="#8B8B8F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B8B8F" stopOpacity="0" />
          </linearGradient>
        </defs>

        {lines.map(line => (
          <g key={line.id}>
            {/* Main line */}
            <path
              d={generatePath(line)}
              stroke={line.color}
              strokeWidth={line.energy > 0.8 ? "1.5" : "1"}
              fill="none"
              opacity={line.opacity}
              style={{
                filter: `drop-shadow(0 0 ${3 + line.energy * 2}px ${line.color}${Math.floor(line.energy * 60).toString(16).padStart(2, '0')})`,
                transition: 'opacity 0.3s ease-out'
              }}
            />

            {/* Enhanced glow effect for red lines */}
            {line.color === '#E10600' && (
              <path
                d={generatePath(line)}
                stroke="url(#redGlow)"
                strokeWidth={2 + line.energy}
                fill="none"
                opacity={line.opacity * 0.6 * line.energy}
              />
            )}

            {/* Enhanced glow effect for white lines */}
            {line.color === '#FFFFFF' && (
              <path
                d={generatePath(line)}
                stroke="url(#whiteGlow)"
                strokeWidth={2 + line.energy}
                fill="none"
                opacity={line.opacity * 0.4 * line.energy}
              />
            )}

            {/* Enhanced glow effect for gray lines */}
            {line.color === '#8B8B8F' && (
              <path
                d={generatePath(line)}
                stroke="url(#grayGlow)"
                strokeWidth={2 + line.energy}
                fill="none"
                opacity={line.opacity * 0.5 * line.energy}
              />
            )}

            {/* Energy nodes for curved lines */}
            {line.direction === 4 && line.nodes.map((node, index) => (
              <g key={index}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={1.5 + line.energy * 0.5}
                  fill={line.color}
                  opacity={line.opacity * 0.8 * line.energy}
                  style={{
                    filter: `drop-shadow(0 0 ${2 + line.energy}px ${line.color}80)`
                  }}
                />
                {/* Inner energy core */}
                {line.energy > 0.7 && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={0.8}
                    fill="#FFFFFF"
                    opacity={line.opacity * 0.9}
                    style={{
                      filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))'
                    }}
                  />
                )}
              </g>
            ))}
          </g>
        ))}

        {/* Floating particles */}
        {particles.map(particle => (
          <g key={particle.id}>
            {/* Particle trail */}
            {particle.trail.map((trailPoint, index) => (
              <circle
                key={index}
                cx={trailPoint.x}
                cy={trailPoint.y}
                r={particle.size * (trailPoint.opacity * 0.5)}
                fill={particle.color}
                opacity={trailPoint.opacity * 0.3}
              />
            ))}

            {/* Main particle */}
            <circle
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={particle.color}
              opacity={(1 - particle.life / particle.maxLife) * 0.8}
              style={{
                filter: `drop-shadow(0 0 4px ${particle.color}60)`
              }}
            />
          </g>
        ))}

        {/* Data packets */}
        {dataPackets.map(packet => (
          <g key={packet.id}>
            {/* Packet trail */}
            <circle
              cx={packet.x}
              cy={packet.y}
              r={packet.size}
              fill={packet.color}
              opacity="0.8"
              style={{
                filter: `drop-shadow(0 0 6px ${packet.color}80)`
              }}
            />

            {/* Inner core */}
            <circle
              cx={packet.x}
              cy={packet.y}
              r={packet.size * 0.6}
              fill="#FFFFFF"
              opacity="0.9"
              style={{
                filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.9))'
              }}
            />

            {/* Pulse effect */}
            <circle
              cx={packet.x}
              cy={packet.y}
              r={packet.size * 2}
              fill="none"
              stroke={packet.color}
              strokeWidth="1"
              opacity={(1 - packet.progress) * 0.4}
              style={{
                filter: `drop-shadow(0 0 4px ${packet.color}40)`
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default AnimatedLines;
