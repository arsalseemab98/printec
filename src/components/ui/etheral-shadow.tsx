'use client';

import React, { useRef, useId, useEffect, useState, CSSProperties } from 'react';
import { animate, useMotionValue, AnimationPlaybackControls } from 'framer-motion';

interface AnimationConfig {
    scale: number;
    speed: number;
}

interface NoiseConfig {
    opacity: number;
    scale: number;
}

interface ShadowOverlayProps {
    sizing?: 'fill' | 'stretch';
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

function mapRange(
    value: number,
    fromLow: number,
    fromHigh: number,
    toLow: number,
    toHigh: number
): number {
    if (fromLow === fromHigh) return toLow;
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
}

export function EtheralShadow({
    sizing = 'fill',
    color = 'rgba(128, 128, 128, 1)',
    animation,
    noise,
    style,
    className,
    children
}: ShadowOverlayProps) {
    const id = `shadow-${useId().replace(/:/g, "")}`;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const animationEnabled = animation && animation.scale > 0 && isVisible;
    const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
    const hueRotateMotionValue = useMotionValue(180);
    const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

    const displacementScale = animation ? mapRange(animation.scale, 1, 100, 10, 50) : 0;
    const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

    // Only activate when in viewport
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (feColorMatrixRef.current && animationEnabled) {
            if (hueRotateAnimation.current) hueRotateAnimation.current.stop();
            hueRotateMotionValue.set(0);
            hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
                duration: animationDuration / 25,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
                ease: "linear",
                delay: 0,
                onUpdate: (value: number) => {
                    if (feColorMatrixRef.current) {
                        feColorMatrixRef.current.setAttribute("values", String(value));
                    }
                }
            });
            return () => { hueRotateAnimation.current?.stop(); };
        }
        // Pause when not visible
        if (!isVisible && hueRotateAnimation.current) {
            hueRotateAnimation.current.stop();
            hueRotateAnimation.current = null;
        }
    }, [animationEnabled, animationDuration, hueRotateMotionValue, isVisible]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                overflow: "hidden",
                position: "relative",
                width: "100%",
                height: "100%",
                contain: "layout style paint",
                willChange: "auto",
                ...style
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: -displacementScale,
                    filter: animationEnabled ? `url(#${id}) blur(3px)` : "none",
                    willChange: animationEnabled ? "filter" : "auto",
                }}
            >
                {animationEnabled && (
                    <svg style={{ position: "absolute", width: 0, height: 0 }}>
                        <defs>
                            <filter id={id}>
                                <feTurbulence
                                    result="undulation"
                                    numOctaves="1"
                                    baseFrequency={`${mapRange(animation.scale, 0, 100, 0.002, 0.001)},${mapRange(animation.scale, 0, 100, 0.005, 0.003)}`}
                                    seed="0"
                                    type="turbulence"
                                />
                                <feColorMatrix
                                    ref={feColorMatrixRef}
                                    in="undulation"
                                    type="hueRotate"
                                    values="180"
                                />
                                <feColorMatrix
                                    in="dist"
                                    result="circulation"
                                    type="matrix"
                                    values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="circulation"
                                    scale={displacementScale}
                                    result="dist"
                                />
                                <feDisplacementMap
                                    in="dist"
                                    in2="undulation"
                                    scale={displacementScale}
                                    result="output"
                                />
                            </filter>
                        </defs>
                    </svg>
                )}
                <div
                    style={{
                        backgroundColor: color,
                        maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
                        maskSize: sizing === "stretch" ? "100% 100%" : "cover",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        width: "100%",
                        height: "100%"
                    }}
                />
            </div>

            {children && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 10,
                    }}
                >
                    {children}
                </div>
            )}

            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
                        backgroundSize: noise.scale * 200,
                        backgroundRepeat: "repeat",
                        opacity: noise.opacity / 2,
                        pointerEvents: "none",
                    }}
                />
            )}
        </div>
    );
}
