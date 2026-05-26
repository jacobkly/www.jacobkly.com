"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface Props {
    gradientBackgroundStart?: string;
    gradientBackgroundEnd?: string;
    firstColor?: string;
    secondColor?: string;
    thirdColor?: string;
    fourthColor?: string;
    fifthColor?: string;
    pointerColor?: string;
    size?: string;
    blendingValue?: string;
    interactive?: boolean;
    className?: string;
    containerClassName?: string;
}

export function BackgroundGradientAnimation({
    gradientBackgroundStart = "rgb(20, 18, 40)",
    gradientBackgroundEnd = "rgb(8, 10, 22)",
    firstColor = "60, 70, 140",
    secondColor = "80, 60, 110",
    thirdColor = "50, 90, 120",
    fourthColor = "90, 70, 130",
    fifthColor = "55, 80, 130",
    pointerColor = "100, 100, 180",
    size = "60%",
    blendingValue = "screen",
    interactive = true,
    className,
    containerClassName,
}: Props) {
    const [isSafari, setIsSafari] = useState(false);
    const [showInteractive, setShowInteractive] = useState(false);
    const interactiveRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }, []);

    useEffect(() => {
        if (!interactive) return;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        setShowInteractive(true);

        const pos = { curX: 0, curY: 0, tgX: 0, tgY: 0 };
        let rafId = 0;

        const handleMove = (e: MouseEvent) => {
            pos.tgX = e.clientX;
            pos.tgY = e.clientY;
        };

        const tick = () => {
            pos.curX += (pos.tgX - pos.curX) / 20;
            pos.curY += (pos.tgY - pos.curY) / 20;
            if (interactiveRef.current) {
                interactiveRef.current.style.transform =
                    `translate(${pos.curX}px, ${pos.curY}px) translate(-50%, -50%)`;
            }
            rafId = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", handleMove);
        rafId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            cancelAnimationFrame(rafId);
        };
    }, [interactive]);

    const cssVars = {
        "--gradient-background-start": gradientBackgroundStart,
        "--gradient-background-end": gradientBackgroundEnd,
        "--first-color": firstColor,
        "--second-color": secondColor,
        "--third-color": thirdColor,
        "--fourth-color": fourthColor,
        "--fifth-color": fifthColor,
        "--pointer-color": pointerColor,
        "--bga-size": size,
        "--blending-value": blendingValue,
    } as React.CSSProperties;

    return (
        <div
            style={cssVars}
            className={cn(
                "absolute inset-0 overflow-hidden",
                "bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
                containerClassName,
            )}
        >
            <svg className="hidden">
                <defs>
                    <filter id="bga-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div
                className={cn(
                    "absolute inset-0 h-full w-full opacity-60",
                    isSafari ? "blur-2xl" : "[filter:url(#bga-goo)_blur(40px)]",
                    className,
                )}
            >
                <div
                    className={cn(
                        "absolute h-[var(--bga-size)] w-[var(--bga-size)] top-[calc(50%-var(--bga-size)/2)] left-[calc(50%-var(--bga-size)/2)]",
                        "[background:radial-gradient(circle_at_center,rgba(var(--first-color),0.7)_0,rgba(var(--first-color),0)_50%)_no-repeat]",
                        "[mix-blend-mode:var(--blending-value)] [transform-origin:center_center]",
                        "animate-bga-first",
                    )}
                />
                <div
                    className={cn(
                        "absolute h-[var(--bga-size)] w-[var(--bga-size)] top-[calc(50%-var(--bga-size)/2)] left-[calc(50%-var(--bga-size)/2)]",
                        "[background:radial-gradient(circle_at_center,rgba(var(--second-color),0.7)_0,rgba(var(--second-color),0)_50%)_no-repeat]",
                        "[mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-400px)]",
                        "animate-bga-second",
                    )}
                />
                <div
                    className={cn(
                        "absolute h-[var(--bga-size)] w-[var(--bga-size)] top-[calc(50%-var(--bga-size)/2)] left-[calc(50%-var(--bga-size)/2)]",
                        "[background:radial-gradient(circle_at_center,rgba(var(--third-color),0.7)_0,rgba(var(--third-color),0)_50%)_no-repeat]",
                        "[mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%+400px)]",
                        "animate-bga-third",
                    )}
                />
                <div
                    className={cn(
                        "absolute h-[var(--bga-size)] w-[var(--bga-size)] top-[calc(50%-var(--bga-size)/2)] left-[calc(50%-var(--bga-size)/2)]",
                        "[background:radial-gradient(circle_at_center,rgba(var(--fourth-color),0.7)_0,rgba(var(--fourth-color),0)_50%)_no-repeat]",
                        "[mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-200px)]",
                        "animate-bga-fourth",
                    )}
                />
                <div
                    className={cn(
                        "absolute h-[calc(var(--bga-size)*2)] w-[calc(var(--bga-size)*2)] top-[calc(50%-var(--bga-size))] left-[calc(50%-var(--bga-size))]",
                        "[background:radial-gradient(circle_at_center,rgba(var(--fifth-color),0.7)_0,rgba(var(--fifth-color),0)_50%)_no-repeat]",
                        "[mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-800px)_calc(50%+200px)]",
                        "animate-bga-fifth",
                    )}
                />
                {showInteractive && (
                    <div
                        ref={interactiveRef}
                        className={cn(
                            "absolute left-0 top-0 h-[var(--bga-size)] w-[var(--bga-size)]",
                            "[background:radial-gradient(circle_at_center,rgba(var(--pointer-color),0.7)_0,rgba(var(--pointer-color),0)_50%)_no-repeat]",
                            "[mix-blend-mode:var(--blending-value)] opacity-70",
                        )}
                    />
                )}
            </div>
        </div>
    );
}
