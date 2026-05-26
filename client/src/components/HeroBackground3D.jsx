import { useEffect, useRef } from 'react';
import { useUIStore } from '../store/useUIStore';

export default function HeroBackground3D() {
  const canvasRef = useRef(null);
  const theme = useUIStore((s) => s.theme);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Map cursor coordinates relative to screen center
      mouse.current.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouse.current.targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // 3D Point definition
    class Point3D {
      constructor(x, y, z, color = '#D4AF37') {
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
      }

      rotateX(angle) {
        const rad = (angle * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const y1 = this.y * cos - this.z * sin;
        const z1 = this.z * cos + this.y * sin;
        this.y = y1;
        this.z = z1;
      }

      rotateY(angle) {
        const rad = (angle * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const x1 = this.x * cos + this.z * sin;
        const z1 = this.z * cos - this.x * sin;
        this.x = x1;
        this.z = z1;
      }

      rotateZ(angle) {
        const rad = (angle * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const x1 = this.x * cos - this.y * sin;
        const y1 = this.y * cos + this.x * sin;
        this.x = x1;
        this.y = y1;
      }
    }

    // 1. Generate Concentric 3D Orbital Rings
    const generateRing = (radius, count, color) => {
      const ringPoints = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 360;
        const rad = (angle * Math.PI) / 180;
        // Generate points in X-Z plane
        ringPoints.push(new Point3D(radius * Math.cos(rad), 0, radius * Math.sin(rad), color));
      }
      return ringPoints;
    };

    const isLight = theme === 'light';
    const goldColor = isLight ? '#C5A030' : '#D4AF37';
    const copperColor = isLight ? '#A76229' : '#B87333';

    // Three luxurious interactive rings
    const ring1 = generateRing(250, 72, goldColor);   // Outer Gold
    const ring2 = generateRing(170, 56, copperColor); // Middle Copper
    const ring3 = generateRing(90, 40, goldColor);    // Inner Gold

    // 2. Generate Floating 3D Starfield
    const starfield = [];
    for (let i = 0; i < 75; i++) {
      const x = (Math.random() - 0.5) * 800;
      const y = (Math.random() - 0.5) * 600;
      const z = (Math.random() - 0.5) * 500;
      starfield.push(new Point3D(x, y, z, Math.random() > 0.4 ? goldColor : copperColor));
    }

    // 3. Generate 3D Landscape Grid Waves
    const gridCols = 22;
    const gridRows = 14;
    const gridSpacing = 44;
    const gridPoints = [];

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const x = (c - gridCols / 2) * gridSpacing;
        const z = (r - gridRows / 2) * gridSpacing;
        gridPoints.push(new Point3D(x, 140, z, goldColor)); // Positioned at base
      }
    }

    let time = 0;

    // Projection calculation
    const project = (point, width, height, pitch, yaw) => {
      // Create a temporary point to apply rotations
      const p = new Point3D(point.x, point.y, point.z);

      // Apply dynamic interactive camera tilt
      p.rotateX(pitch);
      p.rotateY(yaw);

      // Distance from camera (focal distance)
      const fov = 380;
      const cameraDistance = 500;

      // Translate by camera depth
      const zProj = p.z + cameraDistance;

      if (zProj <= 50) return null; // Avoid division by zero/clipping

      const scale = fov / zProj;
      const projX = p.x * scale + width / 2;
      const projY = p.y * scale + height / 2;

      return {
        x: projX,
        y: projY,
        scale: scale,
        depth: p.z,
      };
    };

    // Render loop
    const render = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Clear the canvas cleanly
      ctx.clearRect(0, 0, w, h);

      time += 0.5;

      // Smooth mouse lerping
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Continuous automatic camera drift (pan) + mouse-parallax
      const autoPitch = Math.sin(time * 0.005) * 5;
      const autoYaw = Math.cos(time * 0.005) * 7;
      
      const basePitch = -12; // tilted down
      const baseYaw = time * 0.12; // elegant rotation spin
      
      const interactivePitch = basePitch + autoPitch + mouse.current.y * 14;
      const interactiveYaw = baseYaw + autoYaw + mouse.current.x * 18;

      // Update grid point Y values to create dynamic moving waves
      let gridIdx = 0;
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const pt = gridPoints[gridIdx++];
          // Advanced double sine wave math for beautiful liquid waves
          const dist = Math.sqrt(pt.x * pt.x + pt.z * pt.z);
          pt.y = 120 + Math.sin(dist * 0.016 - time * 0.035) * 48 + Math.cos(pt.x * 0.008 + time * 0.025) * 22;
        }
      }

      // --- DRAW 3D WAVES WITH TRANSLUCENT GRADIENT FILLS ---
      for (let r = 0; r < gridRows - 1; r++) {
        for (let c = 0; c < gridCols - 1; c++) {
          const i0 = r * gridCols + c;
          const i1 = r * gridCols + c + 1;
          const i2 = (r + 1) * gridCols + c + 1;
          const i3 = (r + 1) * gridCols + c;

          const p0 = project(gridPoints[i0], w, h, interactivePitch, interactiveYaw);
          const p1 = project(gridPoints[i1], w, h, interactivePitch, interactiveYaw);
          const p2 = project(gridPoints[i2], w, h, interactivePitch, interactiveYaw);
          const p3 = project(gridPoints[i3], w, h, interactivePitch, interactiveYaw);

          if (p0 && p1 && p2 && p3) {
            const zAvg = (gridPoints[i0].z + gridPoints[i2].z) / 2;
            const depthFade = Math.max(0, 1 - zAvg / 450);
            
            // Draw mesh face solid translucent color
            const fillAlpha = Math.max(0, 0.05 * depthFade);
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fillStyle = theme === 'light' ? `rgba(197, 160, 48, ${fillAlpha})` : `rgba(212, 175, 55, ${fillAlpha})`;
            ctx.fill();

            // Connect wireframe lines
            const lineAlpha = Math.max(0, 0.28 * depthFade);
            ctx.strokeStyle = theme === 'light' ? `rgba(197, 160, 48, ${lineAlpha})` : `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      // Draw grid points for extreme visual high-end detailing
      for (let i = 0; i < gridPoints.length; i++) {
        const proj = project(gridPoints[i], w, h, interactivePitch, interactiveYaw);
        if (proj) {
          const depthFade = Math.max(0, 1 - gridPoints[i].z / 450);
          const dotAlpha = Math.max(0, 0.42 * depthFade);
          ctx.fillStyle = theme === 'light' ? `rgba(197, 160, 48, ${dotAlpha})` : `rgba(212, 175, 55, ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(0.6, 1.4 * proj.scale), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- ROTATE & DRAW CONCENTRIC ORBITAL RINGS WITH COMET TRAILS ---
      const drawRing = (points, rx, ry, rz) => {
        const projectedPoints = [];
        points.forEach((pt) => {
          // Apply individual orbital ring spins
          const rotated = new Point3D(pt.x, pt.y, pt.z);
          rotated.rotateX(rx);
          rotated.rotateY(ry);
          rotated.rotateZ(rz);

          const proj = project(rotated, w, h, interactivePitch, interactiveYaw);
          if (proj) projectedPoints.push(proj);
        });

        // Draw ring path line
        ctx.beginPath();
        for (let i = 0; i < projectedPoints.length; i++) {
          const p = projectedPoints[i];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        const lineAlpha = isLight ? 0.38 : 0.26;
        ctx.strokeStyle = points[0].color === goldColor 
          ? `rgba(212, 175, 55, ${lineAlpha})` 
          : `rgba(184, 115, 51, ${lineAlpha})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // Draw orbital comets and decaying trails
        const trailLength = 10;
        projectedPoints.forEach((p, idx) => {
          // Render a comet every few nodes along the ring
          if (idx % 4 === 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.6, 3.8 * p.scale), 0, Math.PI * 2);
            ctx.fillStyle = points[0].color === goldColor ? `rgba(212, 175, 55, 0.9)` : `rgba(184, 115, 51, 0.9)`;
            ctx.fill();
            
            // Trailing decay comet points
            for (let t = 1; t < trailLength; t++) {
              const trailIdx = (idx - t + projectedPoints.length) % projectedPoints.length;
              const trailP = projectedPoints[trailIdx];
              const decayAlpha = 0.9 * Math.pow(0.68, t); // Exponential decay
              ctx.beginPath();
              ctx.arc(trailP.x, trailP.y, Math.max(0.4, 3.0 * trailP.scale * (1 - t / trailLength)), 0, Math.PI * 2);
              ctx.fillStyle = points[0].color === goldColor 
                ? `rgba(212, 175, 55, ${decayAlpha})` 
                : `rgba(184, 115, 51, ${decayAlpha})`;
              ctx.fill();
            }
          }
        });
      };

      // Ring 1 (Outer Gold) - Tilted on Z, spins slowly
      drawRing(ring1, 45, time * 0.15, time * 0.05);

      // Ring 2 (Middle Copper) - Tilted on X, spins backwards
      drawRing(ring2, -35, -time * 0.2, time * 0.1);

      // Ring 3 (Inner Gold) - Vertical spin
      drawRing(ring3, 75, time * 0.3, -time * 0.15);

      // --- DRAW TWINKLING STARFIELD (3D FLOATING DUST) ---
      starfield.forEach((star, sIdx) => {
        // Star drifts forwards
        star.z -= 0.6;
        if (star.z < -250) {
          star.z = 250; // loop back to distance
          star.x = (Math.random() - 0.5) * 800;
          star.y = (Math.random() - 0.5) * 600;
        }

        const proj = project(star, w, h, interactivePitch, interactiveYaw);
        if (proj) {
          // Dynamic twinkling frequency
          const twinkle = Math.sin(time * 0.06 + sIdx) * 0.32 + 0.68;
          const starAlpha = Math.max(0, 0.55 * (1 - star.z / 350) * twinkle);
          const glowSize = Math.max(0.4, 2.6 * proj.scale * twinkle);
          
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = star.color === goldColor 
            ? `rgba(212, 175, 55, ${starAlpha})` 
            : `rgba(184, 115, 51, ${starAlpha})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-75"
    />
  );
}
