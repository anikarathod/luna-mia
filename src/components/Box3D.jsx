import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CustomGiftBox(props) {
  const group = useRef();

  // This rotates the box slowly and makes it react to the mouse
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 4 + t * 0.1; // Slow spin
    group.current.rotation.x = state.pointer.y * 0.2; // Tilt up/down with mouse
    group.current.rotation.z = -state.pointer.x * 0.2; // Tilt left/right with mouse
  });

  return (
    <group {...props} ref={group} dispose={null}>
      {/* Box Base (Cream) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.5, 2]} />
        <meshStandardMaterial color="#F6F0E7" roughness={0.7} />
      </mesh>

      {/* Box Lid (Cream, slightly larger) */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.1, 0.2, 2.1]} />
        <meshStandardMaterial color="#F6F0E7" roughness={0.7} />
      </mesh>

      {/* Gold Ribbon - Vertical Strip */}
      <mesh position={[0, 0, 1.01]}>
        <boxGeometry args={[0.3, 1.5, 0.02]} />
        <meshStandardMaterial color="#C6A36A" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, -1.01]}>
        <boxGeometry args={[0.3, 1.5, 0.02]} />
        <meshStandardMaterial color="#C6A36A" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Gold Ribbon - Horizontal Strip */}
      <mesh position={[1.01, 0, 0]}>
        <boxGeometry args={[0.02, 1.5, 0.3]} />
        <meshStandardMaterial color="#C6A36A" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[-1.01, 0, 0]}>
        <boxGeometry args={[0.02, 1.5, 0.3]} />
        <meshStandardMaterial color="#C6A36A" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Ribbon Top Detail (on the lid) */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[2.1, 0.02, 0.3]} />
        <meshStandardMaterial color="#C6A36A" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.3, 0.02, 2.1]} />
        <meshStandardMaterial color="#C6A36A" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

export default function Box3D() {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        {/* Soft, luxury lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#C6A36A" />
        
        {/* Studio reflections */}
        <Environment preset="city" />

        {/* Floating animation */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
          <CustomGiftBox position={[0, -0.5, 0]} />
        </Float>
      </Canvas>
    </div>
  );
}