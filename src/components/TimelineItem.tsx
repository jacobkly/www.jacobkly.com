import { Experience } from "@/lib/schemas";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

interface Props {
    experience: Experience;
}

export default function TimelineItem({ experience }: Props) {
    const { name, href, title, logo, start, end, description } =
        experience;

    return (
        <li className="relative ml-10 py-4">
            <Link
                href={href}
                target="_blank"
                className="absolute -left-16 top-4 flex items-center justify-center rounded-full bg-white"
            >
                <Avatar className="size-12 border">
                    <AvatarImage
                        src={logo}
                        alt={name}
                        className="bg-background object-contain"
                    />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
            </Link>
            <div className="flex flex-1 flex-col justify-start gap-1">
                {start && (
                    <time className="text-xs text-muted-foreground">
                        <span>{start}</span>
                        <span>{" - "}</span>
                        <span>{end ? end : "Present"}</span>
                    </time>
                )}
                <h2 className="font-semibold leading-none">{name}</h2>
                {title && <p className="text-sm text-muted-foreground">{title}</p>}
                {description && (
                    <ul className="ml-4 list-outside list-disc">
                        {description.map((desc, i) => (
                            <li key={i} className="prose pr-8 text-sm dark:prose-invert">
                                {desc}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </li>
    );
}