import { RoundedBox } from "@react-three/drei";

export function LaptopPreview() {
  const keys = Array.from({ length: 28 }, (_, i) => {
    const row = Math.floor(i / 7);
    const col = i % 7;
    return { x: -10.2 + col * 3.4, z: -1.8 + row * 2.2 };
  });

  return (
    <group rotation={[0.25, -0.45, 0]} position={[0, -5, 0]}>
      <RoundedBox args={[31, 20, 1.15]} radius={1.2} smoothness={10} position={[0, -5, 2]}>
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.82} />
      </RoundedBox>
      <RoundedBox args={[11, 5.5, 0.16]} radius={0.35} smoothness={6} position={[0, -5.2, 2.7]}>
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.35} />
      </RoundedBox>
      {keys.map((key) => (
        <RoundedBox
          key={`${key.x}-${key.z}`}
          args={[2.35, 0.22, 1.25]}
          radius={0.18}
          smoothness={4}
          position={[key.x, -5.2, key.z + 2.7]}
        >
          <meshStandardMaterial color="#111827" roughness={0.35} />
        </RoundedBox>
      ))}
      <group position={[0, 5, -7.3]} rotation={[-0.52, 0, 0]}>
        <RoundedBox args={[30, 19, 1.15]} radius={1.4} smoothness={10}>
          <meshStandardMaterial color="#94a3b8" roughness={0.18} metalness={0.8} />
        </RoundedBox>
        <RoundedBox args={[27, 15.8, 0.2]} radius={0.8} smoothness={8} position={[0, 0, 0.74]}>
          <meshStandardMaterial color="#020617" roughness={0.12} metalness={0.2} />
        </RoundedBox>
        <mesh position={[1.5, 0, 0.86]} rotation={[0, 0, -0.18]}>
          <planeGeometry args={[18, 11]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#6d28d9"
            emissiveIntensity={0.34}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}