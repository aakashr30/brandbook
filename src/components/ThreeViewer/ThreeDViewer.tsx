import React, { Suspense, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Html,
    useGLTF,
    useProgress,
    PerformanceMonitor,
} from "@react-three/drei";
import { useSpring, animated as aWeb, config } from "@react-spring/web";
import { a as a3 } from "@react-spring/three";
import partsList from "../../data/partsList.json";
import { Object3D } from "three";

interface PartModelProps {
    part: { id: string; file: string };
    isVisible: boolean;
}

const HtmlLoader = React.memo(() => {
    const { progress } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);

    // Smooth progress animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayProgress(progress);
        }, 100);
        return () => clearTimeout(timer);
    }, [progress]);

    const { width, scale, opacity } = useSpring({
        width: displayProgress,
        scale: progress > 0 ? 1 : 0.8,
        opacity: progress > 0 ? 1 : 0.7,
        config: config.gentle,
    });

    // Pulsing animation for the container
    const { containerScale } = useSpring({
        containerScale: 1,
        from: { containerScale: 0.9 },
        config: config.wobbly,
    });

    // Shimmer effect animation
    const { shimmerX } = useSpring({
        shimmerX: progress < 100 ? 100 : 0,
        from: { shimmerX: -100 },
        loop: progress < 100,
        config: { duration: 2000 },
    });

    return (
        <Html center>
            <aWeb.div
                style={{
                    transform: containerScale.to(s => `scale(${s})`),
                    width: 320,
                    padding: 32,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 16px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                }}
            >
                {/* Animated title */}
                <aWeb.div
                    style={{
                        opacity,
                        transform: scale.to(s => `scale(${s})`),
                        fontWeight: "700",
                        fontSize: 20,
                        marginBottom: 20,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textAlign: "center",
                    }}
                >
                </aWeb.div>

                {/* Progress bar container */}
                <div
                    style={{
                        width: "100%",
                        height: 8,
                        background: "linear-gradient(90deg, #f0f2f5 0%, #e1e5e9 100%)",
                        borderRadius: 12,
                        overflow: "hidden",
                        marginBottom: 16,
                        position: "relative",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
                    }}
                >
                    {/* Progress fill with gradient */}
                    <aWeb.div
                        style={{
                            width: width.to((w) => `${w}%`),
                            height: "100%",
                            background: "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                            borderRadius: 12,
                            position: "relative",
                            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: "0 0 12px rgba(102, 126, 234, 0.4)",
                        }}
                    />

                    {/* Shimmer overlay effect */}
                    <aWeb.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                            transform: shimmerX.to(x => `translateX(${x}%)`),
                            borderRadius: 12,
                        }}
                    />
                </div>

                {/* Animated percentage with counter effect */}
                <aWeb.div
                    style={{
                        opacity,
                        transform: scale.to(s => `scale(${s})`),
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        color: "#667eea",
                        fontWeight: "800",
                        fontSize: 18,
                        textAlign: "center",
                        minHeight: 22,
                    }}
                >
                    {width.to((w) => `${Math.round(w)}%`)}
                </aWeb.div>

                {/* Loading dots animation */}
                <div style={{ marginTop: 12, height: 20, display: "flex", alignItems: "center" }}>
                    {[0, 1, 2].map((i) => (
                        <aWeb.div
                            key={i}
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #667eea, #764ba2)",
                                margin: "0 3px",
                                opacity: shimmerX.to(x =>
                                    Math.sin((x + i * 30) * Math.PI / 180) * 0.5 + 0.5
                                ),
                                transform: shimmerX.to(x =>
                                    `translateY(${Math.sin((x + i * 30) * Math.PI / 180) * 2}px) scale(${Math.sin((x + i * 30) * Math.PI / 180) * 0.3 + 1})`
                                ),
                            }}
                        />
                    ))}
                </div>

                {/* Progress status text */}
                <aWeb.div
                    style={{
                        opacity: opacity.to(o => o * 0.7),
                        fontSize: 12,
                        color: "#8892b0",
                        marginTop: 8,
                        textAlign: "center",
                        fontWeight: "500",
                    }}
                >
                    {displayProgress < 100 ? "Preparing your 3D experience..." : "Almost ready!"}
                </aWeb.div>
            </aWeb.div>
        </Html>
    );
});

// const PartModel = React.memo(({ part, isVisible }: PartModelProps) => {
//     const gltf = useGLTF(part.file);
//     const [loaded, setLoaded] = useState(false);

//     // Spring animation for model entrance
//     const { scale, opacity } = useSpring({
//         scale: loaded ? 1 : 0,
//         opacity: loaded ? 1 : 0,
//         config: config.gentle,
//     });

//     useEffect(() => {
//         if (gltf && gltf.scene) {
//             // Add a small delay for staggered loading effect
//             const timer = setTimeout(() => setLoaded(true), Math.random() * 500);
//             return () => clearTimeout(timer);
//         }
//     }, [gltf]);

//     const baseScale = 0.05;

//     return (
//         <a3.group
//             scale={scale.to(s => [s * baseScale, s * baseScale, s * baseScale])}
//             visible={isVisible}
//             dispose={null}
//         >
//             <a3.primitive object={gltf.scene as Object3D} />
//         </a3.group>
//     );
// });
const PartModel = React.memo(({ part, isVisible }: PartModelProps) => {
    const gltf = useGLTF(part.file);
    const [loaded, setLoaded] = useState(false);

    // Set shadow casting and receiving on all meshes inside the gltf scene
    useEffect(() => {
        if (gltf && gltf.scene) {
            gltf.scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            // Small delay for staggered animation
            const timer = setTimeout(() => setLoaded(true), Math.random() * 500);
            return () => clearTimeout(timer);
        }
    }, [gltf]);

    const baseScale = 0.05;
    const { scale, opacity } = useSpring({
        scale: loaded ? 1 : 0,
        opacity: loaded ? 1 : 0,
        config: config.gentle,
    });

    return (
        <a3.group
            scale={scale.to(s => [s * baseScale, s * baseScale, s * baseScale])}
            visible={isVisible}
            dispose={null}
            castShadow // Enable casting shadow on group itself
        >
            <a3.primitive object={gltf.scene as Object3D} />
        </a3.group>
    );
});

interface ThreeDViewerProps {
    hiddenParts: string[];
}

const ThreeDViewer = ({ hiddenParts }: ThreeDViewerProps) => {
    // Precompute and memoize visible parts
    const visibleParts = useMemo(() => {
        return partsList.filter(
            (part) => part.id !== "full_view" && !hiddenParts.includes(part.id)
        );
    }, [hiddenParts]);

    // Load all parts at once instead of incremental loading
    const [isPreloaded, setIsPreloaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Preload all visible parts immediately with progress tracking
    useEffect(() => {
        const preloadParts = async () => {
            let loadedCount = 0;
            const totalParts = visibleParts.length;

            // Preload in parallel with progress updates
            const preloadPromises = visibleParts.map(async (part) => {
                try {
                    await useGLTF.preload(part.file);
                    loadedCount++;
                    setLoadingProgress((loadedCount / totalParts) * 100);
                } catch (error) {
                    console.warn(`Failed to preload ${part.file}:`, error);
                    loadedCount++;
                    setLoadingProgress((loadedCount / totalParts) * 100);
                }
            });

            await Promise.all(preloadPromises);

            // Add a small delay for smooth transition
            setTimeout(() => setIsPreloaded(true), 500);
        };

        if (visibleParts.length > 0) {
            preloadParts();
        }
    }, [visibleParts]);

    // Simplified performance monitor callback
    const onDecline = useCallback(() => {
        console.log("Performance declining");
    }, []);

    const onIncline = useCallback(() => {
        console.log("Performance improving");
    }, []);

    // Canvas entrance animation
    const { canvasOpacity } = useSpring({
        canvasOpacity: isPreloaded ? 1 : 0,
        config: config.slow,
    });

    return (
        <div style={{ height: "900px", backgroundColor: "whitesmoke", position: "relative" }}>
            <div
                style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    opacity: 0.2,
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#000",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 1,
                }}
            >
                BrandBook.
            </div>

            <aWeb.div style={{ opacity: canvasOpacity, height: "100%" }}>
                <Canvas
                    camera={{ position: [0, 4, 40], fov: 35 }}
                    shadows
                    gl={{
                        antialias: false, // Disable antialiasing for better performance
                        powerPreference: "high-performance" // Use dedicated GPU
                    }}
                    dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio
                >
                    <PerformanceMonitor
                        onDecline={onDecline}
                        onIncline={onIncline}
                    />

                    {/* Simplified lighting */}
                    <ambientLight intensity={0.6} />
                    <directionalLight
                        castShadow
                        position={[5, 10, 5]}
                        intensity={0.8}
                        shadow-mapSize-width={512} // Reduced shadow map size
                        shadow-mapSize-height={512}
                        shadow-camera-far={30}
                        shadow-camera-left={-8}
                        shadow-camera-right={8}
                        shadow-camera-top={8}
                        shadow-camera-bottom={-8}
                    />

                    {/* Simplified ground plane */}
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                        <planeGeometry args={[50, 50]} />
                        <shadowMaterial opacity={0.2} />
                    </mesh>

                    <Suspense fallback={<HtmlLoader />}>
                        {/* Render all visible parts at once */}
                        {visibleParts.map((part) => (
                            <PartModel key={part.id} part={part} isVisible={true} />
                        ))}
                    </Suspense>

                    <OrbitControls
                        enableDamping={true}
                        dampingFactor={0.05}
                        maxPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </aWeb.div>
        </div>
    );
};

export default ThreeDViewer;