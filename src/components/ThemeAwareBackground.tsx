"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BackgroundGradientAnimation } from "./ui/BackgroundGradientAnimation";

export default function ThemeAwareBackground() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="pointer-events-none fixed inset-0 -z-10">
            <BackgroundGradientAnimation
                containerClassName="fixed inset-0"
                gradientBackgroundStart={isDark ? "rgb(20, 18, 40)" : "rgb(250, 251, 255)"}
                gradientBackgroundEnd={isDark ? "rgb(8, 10, 22)" : "rgb(238, 243, 255)"}
                firstColor={isDark ? "60, 70, 140" : "110, 140, 240"}
                secondColor={isDark ? "80, 60, 110" : "170, 110, 215"}
                thirdColor={isDark ? "50, 90, 120" : "90, 175, 215"}
                fourthColor={isDark ? "90, 70, 130" : "165, 125, 235"}
                fifthColor={isDark ? "55, 80, 130" : "110, 150, 230"}
                pointerColor={isDark ? "100, 100, 180" : "150, 130, 230"}
                blendingValue={isDark ? "screen" : "multiply"}
                className={isDark ? undefined : "opacity-50"}
            />
        </div>
    );
}
