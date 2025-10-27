import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef, useState } from 'react';
import { useAtlasStore } from './store';

function useColorScale(metric) {
  // simple diverging scale for performance and others
  return (v) => {
    if (metric === 'perf') {
      const clamped = Math.max(-10, Math.min(10, v));
      const t = (clamped + 10) / 20; // 0..1
      return new THREE.Color().setHSL(0.33 * t, 0.9, 0.5); // green->red
    }
    if (metric === 'vol') {
      const t = Math.min(1, v / 100);
      return new THREE.Color().setHSL(0.6 - 0.6 * t, 1, 0.5);
    }
    if (metric === 'headline') {
      const t = v / 100;
      return new THREE.Color().setHSL(0.7 + 0.2 * t, 0.9, 0.6);
    }
    if (metric === 'arpi') {
      const t = v; // 0..1
      return new THREE.Color().setHSL(0.55 + 0.25 * t, 1, 0.55);
    }
    if (metric === 'mcap') {
      const t = Math.min(1, Math.log10(Math.max(1, v)) / 3);
      return new THREE.Color().setHSL(0.1 + 0.5 * t, 1, 0.55);
    }
    return new THREE.Color('white');
  };
}

function Bubbles({ assets }) {
  const { selectAsset, filters } = useAtlasStore();
  const group = useRef();
  const colorFor = useColorScale(filters.heatmap);
  const [hover, setHover] = useState(null);

  const points = useMemo(() => {
    const radius = 10;
    return assets.map((a, i) => {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / assets.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = radius * (0.7 + 0.3 * Math.random());
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      return { ...a, position: [x, y, z] };
    });
  }, [assets]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.0007;
    }
  });

  return (
    <group ref={group}>
      {points.map((p) => {
        const size = Math.max(0.2, Math.min(1.4, Math.cbrt(p.mcap)));
        const color = colorFor(
          filters.heatmap === 'perf' ? p.perf :
          filters.heatmap === 'vol' ? p.vol :
          filters.heatmap === 'headline' ? p.headline :
          filters.heatmap === 'arpi' ? p.arpi : p.mcap
        );
        return (
          <mesh
            key={p.symbol}
            position={p.position}
            onClick={(e) => { e.stopPropagation(); selectAsset(p); }}
            onPointerOver={(e) => { e.stopPropagation(); setHover(p.symbol); }}
            onPointerOut={(e) => { e.stopPropagation(); setHover(null); }}
          >
            <sphereGeometry args={[size, 24, 24]} />
            <meshStandardMaterial emissive={color} color={color} roughness={0.2} metalness={0.6} />
            {hover === p.symbol && (
              <Html distanceFactor={10} position={[0, size + 0.4, 0]}>
                <div className="rounded-md bg-black/80 border border-white/10 px-2 py-1 text-xs whitespace-nowrap">
                  {p.name} • {p.perf}% • ARPI {p.arpi}
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
    </group>
  );
}

export default function GalaxySphere() {
  const assets = useAtlasStore((s) => s.filteredAssets());

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 22], fov: 55 }} dpr={[1, 2]}>
        <color attach="background" args={[0x000000]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color={0x66ccff} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color={0xff66ff} />
        <Bubbles assets={assets} />
        <OrbitControls enablePan={false} minDistance={8} maxDistance={60} zoomSpeed={0.6} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/0" />
    </div>
  );
}
