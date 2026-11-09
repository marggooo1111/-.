import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const PALETTE = ['#c2562f', '#d9a441', '#2aa7a1', '#b3202a', '#6b7a3a', '#12284a', '#f5ead6']
const N = 26
const CANVAS_POS = new THREE.Vector3(0, 1.6, 0)
const ARTIST_POS: [number, number, number] = [-1.5, 0, 1]
const WOOD = '#5a3a22'
const SKIN = '#e0b08c'
const SMOCK = '#c2562f'

interface Stroke { x: number; y: number; w: number; h: number; r: number; c: string }

function makeStrokes(): Stroke[] {
  let seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  return Array.from({ length: N }, (_, i) => {
    const w = 0.4 + rnd() * 0.7
    return { x: -1.1 + rnd() * (2.2 - w), y: -0.5 + rnd() * 1, w, h: 0.1 + rnd() * 0.2, r: (rnd() - 0.5) * 0.6, c: PALETTE[i % PALETTE.length] }
  })
}

function Studio() {
  const strokes = useMemo(makeStrokes, [])
  const refs = useRef<(THREE.Group | null)[]>([])
  const arm = useRef<THREE.Group>(null)
  const target = useMemo(() => new THREE.Vector3(), [])
  const shoulder = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const k = ((t % 30) / 24) * N // 24 s of painting, 6 s hold, then repaint
    refs.current.forEach((g, i) => g && g.scale.setX(Math.max(0.0001, THREE.MathUtils.clamp(k - i, 0, 1))))
    const i = Math.min(N - 1, Math.floor(k))
    const p = THREE.MathUtils.clamp(k - i, 0, 1)
    const s = strokes[i]
    target.set(
      CANVAS_POS.x + s.x + Math.cos(s.r) * s.w * p,
      CANVAS_POS.y + s.y + Math.sin(s.r) * s.w * p + Math.sin(t * 9) * 0.03,
      0.12,
    )
    const a = arm.current
    if (a) {
      a.getWorldPosition(shoulder)
      a.lookAt(target)
      a.scale.z = THREE.MathUtils.clamp(shoulder.distanceTo(target) / 1.7, 0.6, 1.6)
    }
  })

  return (
    <>
      {/* studio */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#8c4a2b" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4, -2.6]}>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial color="#1b3a66" roughness={1} />
      </mesh>
      {[-3.6, 3.6].map((x, i) => (
        <group key={x} position={[x, 2.6, -2.55]}>
          <mesh>
            <boxGeometry args={[1.8, 1.3, 0.1]} />
            <meshStandardMaterial color="#d9a441" metalness={0.6} roughness={0.35} />
          </mesh>
          {[0, 1, 2].map((j) => (
            <mesh key={j} position={[0, 0.4 - j * 0.4, 0.06]}>
              <planeGeometry args={[1.6, 0.38]} />
              <meshStandardMaterial color={PALETTE[(i * 3 + j + 1) % PALETTE.length]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* easel + canvas */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.9, 1.4, -0.25]} rotation={[0.12, 0, s * -0.06]}>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
      ))}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.7, 0.1, 0.25]} />
        <meshStandardMaterial color={WOOD} />
      </mesh>
      <mesh position={CANVAS_POS}>
        <boxGeometry args={[2.5, 1.7, 0.06]} />
        <meshStandardMaterial color="#f5ead6" roughness={0.95} />
      </mesh>
      <group position={CANVAS_POS}>
        {strokes.map((s, i) => (
          <group key={i} ref={(el) => { refs.current[i] = el }} position={[s.x, s.y, 0.04 + i * 0.0015]} rotation={[0, 0, s.r]}>
            <mesh position={[s.w / 2, 0, 0]}>
              <planeGeometry args={[s.w, s.h]} />
              <meshStandardMaterial color={s.c} roughness={0.55} />
            </mesh>
          </group>
        ))}
      </group>

      {/* artist (stylized): the right arm aims at the brush stroke being painted */}
      <group position={ARTIST_POS} rotation={[0, 2.16, 0]}>
        {[-0.17, 0.17].map((x) => (
          <mesh key={x} position={[x, 0.5, 0]}>
            <capsuleGeometry args={[0.11, 0.7, 4, 12]} />
            <meshStandardMaterial color="#2a2a3a" />
          </mesh>
        ))}
        <mesh position={[0, 1.35, 0]} scale={[1, 1, 0.7]}>
          <capsuleGeometry args={[0.3, 0.55, 4, 16]} />
          <meshStandardMaterial color={SMOCK} />
        </mesh>
        <mesh position={[0, 2.02, 0]}>
          <sphereGeometry args={[0.22, 24, 16]} />
          <meshStandardMaterial color={SKIN} />
        </mesh>
        <mesh position={[0, 2.0, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.04, 0.1, 8]} />
          <meshStandardMaterial color={SKIN} />
        </mesh>
        <mesh position={[0, 2.2, 0]} scale={[1, 0.35, 1]}>
          <sphereGeometry args={[0.27, 24, 16]} />
          <meshStandardMaterial color="#7a1620" />
        </mesh>
        <mesh position={[0.36, 1.2, 0]} rotation={[0, 0, 0.15]}>
          <capsuleGeometry args={[0.07, 0.7, 4, 8]} />
          <meshStandardMaterial color={SMOCK} />
        </mesh>
        <mesh position={[0.42, 0.82, 0.1]}>
          <cylinderGeometry args={[0.2, 0.2, 0.03, 20]} />
          <meshStandardMaterial color="#8a5a34" />
        </mesh>
        <group ref={arm} position={[-0.3, 1.55, 0]}>
          <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.07, 0.8, 4, 8]} />
            <meshStandardMaterial color={SMOCK} />
          </mesh>
          <mesh position={[0, 0, 1.1]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color={SKIN} />
          </mesh>
          <mesh position={[0, 0, 1.35]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
            <meshStandardMaterial color={WOOD} />
          </mesh>
          <mesh position={[0, 0, 1.62]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.035, 0.1, 8]} />
            <meshStandardMaterial color="#d9a441" />
          </mesh>
        </group>
      </group>
    </>
  )
}

function Lights() {
  const l = useRef<THREE.PointLight>(null)
  useFrame(({ camera, clock }) => {
    if (!l.current) return
    l.current.position.set(camera.position.x * 1.5, 3.2, 3)
    l.current.color.setHSL(0.08 + 0.06 * Math.sin(clock.elapsedTime * 0.4), 0.8, 0.6)
  })
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffe2b0" />
      <pointLight ref={l} intensity={40} distance={14} decay={2} />
    </>
  )
}

function Rig({ entering }: { entering: boolean }) {
  const goal = useMemo(() => new THREE.Vector3(), [])
  const width = useThree((s) => s.size.width)
  useFrame(({ camera, pointer }) => {
    if (entering) goal.set(0, 1.6, 1.2)
    else goal.set(0.6 + pointer.x * 0.8, 1.9 + pointer.y * 0.3, width < 700 ? 8.5 : 5.8)
    camera.position.lerp(goal, entering ? 0.035 : 0.05)
    camera.lookAt(0, 1.5, 0)
  })
  return null
}

export default function ArtistStudio({ entering = false }: { entering?: boolean }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0.6, 1.9, 5.8], fov: 40 }}>
      <color attach="background" args={['#12284a']} />
      <fog attach="fog" args={['#12284a', 9, 18]} />
      <Lights />
      <Rig entering={entering} />
      <Studio />
      <Sparkles count={50} scale={[6, 3.5, 3]} position={[0, 1.8, 0.5]} size={5} speed={0.6} color="#d9a441" />
      <Sparkles count={40} scale={[6, 3.5, 3]} position={[0, 1.8, 0.5]} size={5} speed={0.5} color="#2aa7a1" />
      <Sparkles count={40} scale={[6, 3.5, 3]} position={[0, 1.8, 0.5]} size={5} speed={0.4} color="#c2562f" />
    </Canvas>
  )
}
