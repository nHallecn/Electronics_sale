import React from "react";
import { RoundedBox } from "@react-three/drei";

export function Model(props) {
  return (
    <group {...props}>
      <RoundedBox args={[23.2, 43.5, 3.8]} radius={2.6} smoothness={12}>
        <meshStandardMaterial color="#dbeafe" roughness={0.18} metalness={0.9} />
      </RoundedBox>

      <RoundedBox args={[22.1, 42.3, 3.95]} radius={2.35} smoothness={12} position={[0, 0, 0.08]}>
        <meshStandardMaterial color="#0f172a" roughness={0.24} metalness={0.72} />
      </RoundedBox>

      <RoundedBox args={[19.4, 38.7, 0.22]} radius={1.65} smoothness={12} position={[0, -0.4, 2.08]}>
        <meshStandardMaterial
          color="#08111f"
          emissive="#0b56a4"
          emissiveIntensity={0.36}
          roughness={0.06}
          metalness={0.02}
        />
      </RoundedBox>

      <mesh position={[-2.8, 2.5, 2.22]} rotation={[0, 0, -0.22]}>
        <planeGeometry args={[7, 23]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0ea5e9"
          emissiveIntensity={0.55}
          transparent
          opacity={0.16}
          roughness={0.08}
        />
      </mesh>

      <mesh position={[4.2, -2.8, 2.23]} rotation={[0, 0, -0.22]}>
        <planeGeometry args={[4.8, 30]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.38}
          transparent
          opacity={0.12}
          roughness={0.08}
        />
      </mesh>

      <RoundedBox args={[7.5, 1.45, 0.3]} radius={0.7} smoothness={10} position={[0, 18.3, 2.28]}>
        <meshStandardMaterial color="#020617" roughness={0.36} metalness={0.25} />
      </RoundedBox>

      <mesh position={[0, 14.1, 2.35]}>
        <circleGeometry args={[0.5, 40]} />
        <meshStandardMaterial color="#1e293b" roughness={0.14} metalness={0.8} />
      </mesh>

      <mesh position={[0, -15.6, 2.28]}>
        <circleGeometry args={[1, 48]} />
        <meshStandardMaterial color="#020617" roughness={0.15} metalness={0.9} />
      </mesh>

      <RoundedBox args={[0.42, 8.8, 0.72]} radius={0.18} smoothness={6} position={[-11.85, 6.4, 0.35]}>
        <meshStandardMaterial color="#bfdbfe" roughness={0.18} metalness={0.92} />
      </RoundedBox>

      <RoundedBox args={[0.42, 5.5, 0.72]} radius={0.18} smoothness={6} position={[11.85, 8.8, 0.35]}>
        <meshStandardMaterial color="#bfdbfe" roughness={0.18} metalness={0.92} />
      </RoundedBox>

      <group position={[0, 0, -1.95]}>
        <RoundedBox args={[7.3, 9.3, 0.75]} radius={1.45} smoothness={12} position={[-5.1, 13.2, -0.05]}>
          <meshStandardMaterial color="#1e293b" roughness={0.16} metalness={0.82} />
        </RoundedBox>
        {[
          [-6.35, 15.15],
          [-3.95, 15.15],
          [-6.35, 12.65],
        ].map(([x, y]) => (
          <group key={`${x}-${y}`} position={[x, y, -0.48]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[1.05, 1.05, 0.45, 48]} />
              <meshStandardMaterial color="#020617" roughness={0.12} metalness={0.92} />
            </mesh>
            <mesh position={[0, 0, -0.26]}>
              <cylinderGeometry args={[0.56, 0.56, 0.08, 40]} />
              <meshStandardMaterial color="#2563eb" emissive="#1d4ed8" emissiveIntensity={0.25} />
            </mesh>
          </group>
        ))}
        <mesh position={[-3.95, 12.65, -0.48]}>
          <sphereGeometry args={[0.35, 24, 16]} />
          <meshStandardMaterial color="#f8fafc" emissive="#e0f2fe" emissiveIntensity={0.25} />
        </mesh>
      </group>

      <mesh position={[0, 19.1, 2.42]}>
        <planeGeometry args={[11, 0.18]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.32}
          roughness={0.05}
        />
      </mesh>
    </group>
  );
}
