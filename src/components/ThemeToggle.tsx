"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full border [border-color:hsl(var(--foreground))] bg-transparent shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95"
        >
            {isDark ? (
                <SunIcon className="size-6 text-orange-300" />
            ) : (
                <MoonIcon className="size-6 text-indigo-400" />
            )}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
