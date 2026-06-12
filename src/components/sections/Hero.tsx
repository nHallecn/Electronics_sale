import { Component, Suspense, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Model } from "@/components/models/Scene.jsx";

class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function ModelFallback() {
  return <div className="h-full min-h-[420px] w-full" />;
}

function RotatablePhone() {
  const groupRef = useRef<THREE.Group>(null);
  const draggingRef = useRef(false);
  const baseRotationRef = useRef({ x: 0.08, y: -0.35, z: 0.04 });
  const targetRotationRef = useRef({ ...baseRotationRef.current });

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const ease = 1 - Math.pow(0.0008, delta);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotationRef.current.x, ease);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotationRef.current.y, ease);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetRotationRef.current.z, ease);
  });

  const resetRotation = () => {
    draggingRef.current = false;
    targetRotationRef.current = { ...baseRotationRef.current };
  };

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const target = event.target as Element & {
      setPointerCapture?: (pointerId: number) => void;
    };
    target.setPointerCapture?.(event.pointerId);
    draggingRef.current = true;
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!draggingRef.current) return;

    targetRotationRef.current = {
      x: THREE.MathUtils.clamp(
        targetRotationRef.current.x + event.nativeEvent.movementY * 0.004,
        -0.55,
        0.55
      ),
      y: targetRotationRef.current.y + event.nativeEvent.movementX * 0.006,
      z: baseRotationRef.current.z,
    };
  };

  return (
    <group
      ref={groupRef}
      rotation={[
        baseRotationRef.current.x,
        baseRotationRef.current.y,
        baseRotationRef.current.z,
      ]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={resetRotation}
      onPointerCancel={resetRotation}
      onPointerLeave={resetRotation}
    >
      <Model scale={1.1} position={[0, -4, 0]} />
    </group>
  );
}

function HeroPhoneModel() {
  return (
    <ModelErrorBoundary fallback={<ModelFallback />}>
      <Canvas
        camera={{ position: [0, 0, 120], fov: 35 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 8, 6]} intensity={1.4} />
        <directionalLight position={[-6, 3, -4]} intensity={0.8} color="#60a5fa" />
        <Suspense fallback={null}>
          <Stage adjustCamera={false} environment="city" intensity={0.7} shadows={false}>
            <RotatablePhone />
          </Stage>
        </Suspense>
      </Canvas>
    </ModelErrorBoundary>
  );
}


export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (textRef.current && modelRef.current) {
      tl.fromTo(
        textRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      ).fromTo(
        modelRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
        "-=0.8"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 to-black pt-20"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <div ref={textRef} className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Designed to <span className="text-primary">Amaze.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
            Experience the future in the palm of your hand. The all-new NexGen flagship redefines what's possible with a seamless design and uncompromised performance.
          </p>
          <div className="pt-4">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full">
              Explore Now
            </Button>
          </div>
        </div>
        <div className="relative">
          <div
            ref={modelRef}
            className="relative z-10 h-[520px] max-h-[70vh] min-h-[420px] w-full touch-none"
            aria-label="Rotatable NexGen Flagship Smartphone 3D model"
          >
            <HeroPhoneModel />
          </div>
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
