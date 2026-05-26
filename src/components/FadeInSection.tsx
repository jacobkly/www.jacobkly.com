"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
    children: React.ReactNode;
    delay?: number;
    inView?: boolean;
    className?: string;
}

export default function FadeInSection({
    children,
    delay = 0,
    inView = false,
    className,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [animate, setAnimate] = useState(!inView);

    useEffect(() => {
        if (!inView) return;
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [inView]);

    const classes = [
        "fade-in-section",
        animate ? "fade-in-section-animate" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const style = animate ? { animationDelay: `${delay}s` } : undefined;

    return (
        <div ref={ref} className={classes} style={style}>
            {children}
        </div>
    );
}
