"use client";

import { applyProps, Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Color, DoubleSide, Group, MathUtils, MeshPhysicalMaterial, PMREMGenerator } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createFold } from "./geometry";

type Props = {
  stage: RefObject<HTMLDivElement | null>;
  phase: number;
  proof: boolean;
  onReady: (ready: boolean) => void;
  onFailure: () => void;
};

const poses = [
  { x: -.32, y: -.66, z: -.66, opening: .05 },
  { x: -.12, y: .4, z: -.25, opening: .57 },
  { x: .38, y: 1.04, z: .41, opening: .88 },
  { x: -.2, y: 2.5, z: -.96, opening: .38 },
];

function Sculpture({ stage, phase, proof, onReady, onFailure }: Props) {
  const ref = useRef<Group>(null);
  const second = useRef<Group>(null);
  const third = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frames = useRef(0);
  const recent = useRef({ sum: 0, count: 0 });
  const { gl, scene } = useThree();
  const callbacks = useRef({ onReady, onFailure });

  useEffect(() => { callbacks.current = { onReady, onFailure }; }, [onReady, onFailure]);

  const fold = useMemo(() => createFold(0), []);
  const echo = useMemo(() => createFold(1), []);
  const silver = useMemo(() => new MeshPhysicalMaterial({ color: new Color("#bac9e4"), metalness: .97, roughness: .21, clearcoat: .57, clearcoatRoughness: .22, side: DoubleSide }), []);
  const cobalt = useMemo(() => new MeshPhysicalMaterial({ color: new Color("#3c60c4"), metalness: .85, roughness: .25, clearcoat: .38, side: DoubleSide }), []);

  useEffect(() => () => {
    fold.dispose();
    echo.dispose();
    silver.dispose();
    cobalt.dispose();
  }, [fold, echo, silver, cobalt]);

  useEffect(() => {
    const generator = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const environment = generator.fromScene(room, .04, .1, 50);
    const original = { environment: scene.environment, environmentIntensity: scene.environmentIntensity };
    applyProps(scene, { environment: environment.texture, environmentIntensity: 1.37 });
    room.dispose();
    generator.dispose();
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); callbacks.current.onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      applyProps(scene, original);
      environment.dispose();
      callbacks.current.onReady(false);
    };
  }, [gl, scene]);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const move = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      pointer.current = { x: (event.clientX - box.left) / box.width - .5, y: (event.clientY - box.top) / box.height - .5 };
    };
    const reset = () => { pointer.current = { x: 0, y: 0 }; };
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
    };
  }, [stage]);

  useFrame((state, delta) => {
    if (!ref.current || !second.current || !third.current) return;
    frames.current++;
    if (frames.current === 5) callbacks.current.onReady(true);
    if (!proof && frames.current > 28 && delta < .2 && !document.hidden) {
      recent.current.sum += delta;
      recent.current.count++;
      if (recent.current.count === 55 && recent.current.sum / 55 > .043) callbacks.current.onFailure();
    }
    const pose = poses[phase];
    const next = poses[Math.min(phase + 1, poses.length - 1)];
    const rect = stage.current?.getBoundingClientRect();
    const progress = !rect || proof ? 0 : MathUtils.smoothstep((innerHeight * .5 - rect.top) / (innerHeight * .5 + rect.height), 0, 1) * .61;
    const opening = MathUtils.lerp(pose.opening, next.opening, progress);
    const time = proof ? 0 : state.clock.elapsedTime;
    const p = pointer.current;
    ref.current.rotation.x = MathUtils.damp(ref.current.rotation.x, MathUtils.lerp(pose.x, next.x, progress) + p.y * .37, 4, delta);
    ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, MathUtils.lerp(pose.y, next.y, progress) + p.x * .65 + Math.sin(time * .52) * .055, 4, delta);
    ref.current.rotation.z = MathUtils.damp(ref.current.rotation.z, MathUtils.lerp(pose.z, next.z, progress) + Math.sin(time * .65) * .04, 4, delta);
    ref.current.position.y = Math.sin(time * .75) * .065;
    second.current.position.x = opening * 1.02;
    second.current.rotation.y = .3 + opening * .65;
    third.current.position.x = -opening * .89;
    third.current.rotation.y = -.19 - opening * .75;
  });

  const pose = poses[phase];
  return <group ref={ref} rotation={[pose.x, pose.y, pose.z]}>
    <mesh geometry={fold} material={silver} />
    <group ref={second} position={[pose.opening, -.03, -.14]}><mesh geometry={echo} material={cobalt} rotation={[0, 0, -.24]} scale={[.8, .89, .8]} /></group>
    <group ref={third} position={[-pose.opening, .04, .12]}><mesh geometry={fold} material={silver} rotation={[0, .3, .42]} scale={[.61, .64, .63]} /></group>
  </group>;
}

export default function Scene(props: Props) {
  return <Canvas camera={{ position: [0, 0, 7.6], fov: 36 }} dpr={[1, 1.35]} gl={{ alpha: true, antialias: true, powerPreference: "low-power", preserveDrawingBuffer: props.proof }}>
    <Sculpture {...props} />
  </Canvas>;
}
