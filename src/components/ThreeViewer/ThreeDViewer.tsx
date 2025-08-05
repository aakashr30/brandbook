
import React, { Suspense, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Html,
    useGLTF,
    useProgress,
    PerformanceMonitor,
} from "@react-three/drei";
import { useSpring, animated as aWeb } from "@react-spring/web";
import { a as a3 } from "@react-spring/three";
import partsList from "../../data/partsList.json";
import { Object3D } from "three";

interface PartModelProps {
    part: { id: string; file: string };
    isVisible: boolean;
}

const HtmlLoader = () => {
    const { progress } = useProgress();
    const { width } = useSpring({
        width: progress,
        config: { tension: 120, friction: 16 },
    });

    return (
        <Html center>
            <div
                style={{
                    width: 300,
                    padding: 32,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.85)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                }}
            >
                <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 18 }}>
                    Loading 3D Model...
                </div>
                <div
                    style={{
                        width: "86%",
                        height: 14,
                        background: "#eee",
                        borderRadius: 6,
                        overflow: "hidden",
                        marginBottom: 12,
                        border: "1px solid #ddd",
                    }}
                >
                    <aWeb.div
                        style={{
                            width: width.to((n) => `${n}%`),
                            height: "100%",
                            background: "linear-gradient(90deg,#5cc6ff 10%,#1883ff 100%)",
                            borderRadius: 6,
                        }}
                    />
                </div>
                <div
                    style={{
                        fontFamily: "monospace",
                        color: "#1883ff",
                        fontWeight: "bold",
                        fontSize: 16,
                    }}
                >
                    {progress.toFixed(0)}%
                </div>
            </div>
        </Html>
    );
};

const PartModel = ({ part, isVisible }: PartModelProps) => {
    const gltf = useGLTF(part.file);
    const [loaded, setLoaded] = useState(false);

    const baseScale = 0.05;
    const { scale } = useSpring({
        scale: loaded ? 1 : 0.01,
        config: { mass: 1, tension: 120, friction: 14 },
    });

    useEffect(() => {
        if (gltf && gltf.scene) setLoaded(true);
    }, [gltf]);

    return (
        <a3.group
            scale={scale.to((s) => [s * baseScale, s * baseScale, s * baseScale])}
            visible={isVisible}
            dispose={null}
        >
            <primitive object={gltf.scene as Object3D} />
        </a3.group>
    );
};

partsList.forEach((part) => {
    if (part.id === "full_view") useGLTF.preload(part.file);
});

interface ThreeDViewerProps {
    hiddenParts: string[];
}

const ThreeDViewer = ({ hiddenParts }: ThreeDViewerProps) => {
    const fullViewId = "full_view";
    const showFullView = !hiddenParts.includes(fullViewId);

    const visibleParts = useMemo(() => {
        return partsList.filter((part) => {
            if (part.id === fullViewId) return showFullView;
            return !showFullView && !hiddenParts.includes(part.id);
        });
    }, [hiddenParts, showFullView]);

    return (
        <div style={{ height: "668px", backgroundColor: "whitesmoke" }}>
            <div
                style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    opacity: 0.2,
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#000",
                    pointerEvents: "none", // allows clicks to pass through
                    userSelect: "none",     // prevents text selection
                }}
            >
                BrandBook.
            </div>
            <Canvas
                camera={{ position: [0, 4, 40], fov: 35 }}
                shadows
            >
                <PerformanceMonitor
                    onDecline={() => {
                        console.log("Performance declining, consider lowering detail");
                    }}
                    onIncline={() => {
                        console.log("Performance improving");
                    }}
                />

                <ambientLight intensity={0.5} />
                <directionalLight
                    castShadow
                    position={[5, 10, 5]}
                    intensity={1}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />

                <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -0.01, 0]}
                >
                    <planeGeometry args={[100, 100]} />
                    <shadowMaterial opacity={0.3} />
                </mesh>

                <Suspense fallback={<HtmlLoader />}>
                    {visibleParts.map((part) => (
                        <PartModel key={part.id} part={part} isVisible={true} />
                    ))}
                </Suspense>

                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default ThreeDViewer;
