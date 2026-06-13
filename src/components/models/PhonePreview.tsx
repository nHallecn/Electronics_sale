import { RoundedBox } from "@react-three/drei";

export function PhonePreview() {
  return (
    <group rotation={[0.1, -0.42, 0.03]} scale={0.95} position={[0, -1.2, 0]}>
      <RoundedBox args={[17, 32, 2.4]} radius={2.8} smoothness={16}>
        <meshStandardMaterial color="#dbeafe" roughness={0.18} metalness={0.85} />
      </RoundedBox>
      <RoundedBox args={[14.8, 28.8, 0.24]} radius={2.1} smoothness={14} position={[0, 0, 1.34]}>
        <meshStandardMaterial
          color="#020617"
          emissive="#0f172a"
          emissiveIntensity={0.24}
          roughness={0.08}
          metalness={0.25}
        />
      </RoundedBox>
      <mesh position={[-2.3, 1.4, 1.5]} rotation={[0, 0, -0.18]}>
        <planeGeometry args={[9.2, 22]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#2563eb"
          emissiveIntensity={0.36}
          transparent
          opacity={0.28}
        />
      </mesh>
      <mesh position={[4.1, -3.4, 1.52]} rotation={[0, 0, 0.32]}>
        <planeGeometry args={[5.8, 18]} />
        <meshStandardMaterial
          color="#f472b6"
          emissive="#db2777"
          emissiveIntensity={0.24}
          transparent
          opacity={0.24}
        />
      </mesh>
      <RoundedBox args={[5.8, 0.55, 0.18]} radius={0.28} smoothness={8} position={[0, 13.3, 1.58]}>
        <meshStandardMaterial color="#111827" roughness={0.2} />
      </RoundedBox>
      <mesh position={[5.1, 13.3, 1.6]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#020617" roughness={0.12} metalness={0.75} />
      </mesh>
      <RoundedBox args={[5.4, 0.42, 0.16]} radius={0.25} smoothness={8} position={[0, -13.4, 1.58]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.16} metalness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.32, 4.2, 0.54]} radius={0.18} smoothness={6} position={[8.7, 4.6, 0.12]}>
        <meshStandardMaterial color="#bfdbfe" roughness={0.18} metalness={0.85} />
      </RoundedBox>
      <RoundedBox args={[0.32, 3.1, 0.54]} radius={0.18} smoothness={6} position={[-8.7, 6.8, 0.12]}>
        <meshStandardMaterial color="#bfdbfe" roughness={0.18} metalness={0.85} />
      </RoundedBox>
    </group>
  );
}