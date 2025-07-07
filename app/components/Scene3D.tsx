"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text, Sphere, Box } from "@react-three/drei"

// Simple fallback component for when 3D fails to load
function Scene3DFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Animated CSS-only background */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes using CSS animations */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-blue-500/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-12 h-12 border-2 border-purple-500/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-3/4 w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rotate-12 animate-spin"></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-4 p-4">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="border border-blue-500/20 animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "3s",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Code-like floating elements */}
      <div className="absolute top-1/3 left-1/6 text-blue-400/60 font-mono text-sm animate-float">{"<code />"}</div>
      <div className="absolute bottom-1/3 right-1/6 text-purple-400/60 font-mono text-sm animate-float-delayed">
        {"{ dev }"}
      </div>
    </div>
  )
}

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false)
  const [shouldRender3D, setShouldRender3D] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const isMobileDevice = width < 768
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      const hasLimitedMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4

      setIsMobile(isMobileDevice)

      // Disable 3D on very low-end devices
      if (isLowEndDevice || hasLimitedMemory) {
        setShouldRender3D(false)
        setIsLoading(false)
      }
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    // Set a timeout to show fallback if 3D doesn't load within 5 seconds
    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true)
        setIsLoading(false)
      }
    }, 5000)

    return () => {
      window.removeEventListener("resize", checkDevice)
      clearTimeout(timeout)
    }
  }, [isLoading])

  // If device can't handle 3D or there's an error, show fallback
  if (!shouldRender3D || hasError) {
    return <Scene3DFallback />
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-blue-400 text-sm">Loading 3D Scene...</p>
          </div>
        </div>
      )}

      <Canvas
        camera={{
          position: isMobile ? [0, 0, 8] : [0, 0, 5],
          fov: isMobile ? 50 : 75,
        }}
        performance={{ min: 0.2, max: 1 }}
        dpr={[0.5, isMobile ? 1 : 2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
        onCreated={() => {
          setIsLoading(false)
        }}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      >
        <Suspense fallback={null}>
          <SceneContent isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function SceneContent({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={isMobile ? 0.6 : 0.4} />
      <pointLight position={[10, 10, 10]} intensity={isMobile ? 0.4 : 0.8} />

      {/* Simplified elements for mobile */}
      {isMobile ? (
        <>
          <Float speed={0.5} rotationIntensity={0.3} floatIntensity={1}>
            <SimpleCodeBlock position={[-1.5, 1, -2]} scale={0.8} />
          </Float>
          <Float speed={0.7} rotationIntensity={0.2} floatIntensity={0.8}>
            <SimpleCodeBlock position={[1.5, -0.5, -1.5]} scale={0.6} />
          </Float>
          <Float speed={0.4} rotationIntensity={0.5} floatIntensity={1.2}>
            <Sphere args={[0.3]} position={[0, 1.5, -2]}>
              <meshBasicMaterial color="#8b5cf6" wireframe />
            </Sphere>
          </Float>
        </>
      ) : (
        <>
          <Float speed={1} rotationIntensity={1} floatIntensity={2}>
            <CodeBlock position={[-3, 2, -2]} scale={1} />
          </Float>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <CodeBlock position={[3, -1, -1]} scale={1} />
          </Float>
          <Float speed={0.8} rotationIntensity={2} floatIntensity={3}>
            <Sphere args={[0.5]} position={[2, 2, -3]}>
              <meshStandardMaterial color="#8b5cf6" wireframe />
            </Sphere>
          </Float>
          <Float speed={1.2} rotationIntensity={1.5} floatIntensity={2}>
            <Box args={[0.8, 0.8, 0.8]} position={[-2, -2, -2]}>
              <meshStandardMaterial color="#3b82f6" wireframe />
            </Box>
          </Float>
        </>
      )}
    </>
  )
}

// Simplified code block for mobile
function SimpleCodeBlock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 0.6, 0.1]} />
      <meshBasicMaterial color="#1e293b" />
    </mesh>
  )
}

// Full code block for desktop
function CodeBlock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 0.6, 0.1]} />
      <meshStandardMaterial color="#1e293b" />
      <Text position={[0, 0, 0.06]} fontSize={0.08 * scale} color="#64748b" anchorX="center" anchorY="middle">
        {"<code />"}
      </Text>
    </mesh>
  )
}
