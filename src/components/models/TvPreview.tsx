import { RoundedBox } from "@react-three/drei";

export function TvPreview() {
  return (
    <group rotation={[0.08, -0.35, 0]} position={[0, -1, 0]}>
      <RoundedBox args={[35, 20, 1.6]} radius={0.7} smoothness={8}>
        <meshStandardMaterial color="#111827" roughness={0.22} metalness={0.7} />
      </RoundedBox>
      <RoundedBox args={[32.4, 17.4, 0.35]} radius={0.35} smoothness={8} position={[0, 0.4, 1]}>
        <meshStandardMaterial color="#020617" roughness={0.12} metalness={0.25} />
      </RoundedBox>
      <mesh position={[-2, 0.8, 1.22]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#2563eb"
          emissiveIntensity={0.35}
          transparent
          opacity={0.45}
        />
      </mesh>
      <mesh position={[5, -1.2, 1.24]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#e11d48"
          emissiveIntensity={0.26}
          transparent
          opacity={0.28}
        />
      </mesh>
      <RoundedBox args={[3.2, 5.5, 1]} radius={0.25} smoothness={6} position={[0, -12.6, -0.1]}>
        <meshStandardMaterial color="#1f2937" roughness={0.2} metalness={0.75} />
      </RoundedBox>
      <RoundedBox args={[14, 1.4, 5.5]} radius={0.45} smoothness={8} position={[0, -16, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.24} metalness={0.8} />
      </RoundedBox>
    </group>
  );
}