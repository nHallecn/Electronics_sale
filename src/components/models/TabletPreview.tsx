import { RoundedBox } from "@react-three/drei";

export function TabletPreview() {
  return (
    <group rotation={[0.12, -0.5, 0.04]} position={[0, -1, 0]}>
      <RoundedBox args={[25, 34, 2]} radius={2.2} smoothness={12}>
        <meshStandardMaterial color="#e2e8f0" roughness={0.18} metalness={0.82} />
      </RoundedBox>
      <RoundedBox args={[22.5, 31, 0.28]} radius={1.55} smoothness={12} position={[0, 0, 1.16]}>
        <meshStandardMaterial
          color="#020617"
          emissive="#0f766e"
          emissiveIntensity={0.18}
          roughness={0.08}
        />
      </RoundedBox>
      <mesh position={[-2.6, 1.6, 1.34]} rotation={[0, 0, -0.28]}>
        <planeGeometry args={[12, 24]} />
        <meshStandardMaterial
          color="#14b8a6"
          emissive="#0d9488"
          emissiveIntensity={0.34}
          transparent
          opacity={0.28}
        />
      </mesh>
      <mesh position={[6.5, -3, 2.1]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.45, 0.45, 31, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.16} metalness={0.35} />
      </mesh>
      <mesh position={[0, 15.6, 1.45]}>
        <circleGeometry args={[0.55, 36]} />
        <meshStandardMaterial color="#020617" roughness={0.16} metalness={0.8} />
      </mesh>
    </group>
  );
}