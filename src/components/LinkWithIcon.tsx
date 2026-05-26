import Link from "next/link";
import React from "react";

type LinkWithIconProps = {
    href: string;
    icon?: React.ReactNode;
    position: "left" | "right";
    text?: string;
    external?: boolean;
};

export default function LinkWithIcon({
    href,
    icon,
    position,
    text,
    external = true,
}: LinkWithIconProps) {
    const target = external ? "_blank" : undefined;
    const rel = external ? "noopener noreferrer" : undefined;

    return (
        <Link
            href={href}
            target={target}
            rel={rel}
            className="link flex items-center gap-2 font-light"
        >
            {position === "left" && icon}
            <span>{text}</span>
            {position === "right" && icon}
        </Link>
    );
}
