import LinkWithIcon from "@/components/LinkWithIcon";
import Projects from "@/components/Projects";
import { ArrowLeftIcon } from "lucide-react";

export default function ProjectsPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <div className="flex justify-between">
        <h1 className="title text-3xl sm:text-4xl font-serif">all projects</h1>
        <LinkWithIcon
          href="/"
          position="left"
          icon={<ArrowLeftIcon className="size-5" />}
          text="back home"
          external={false}
        />
      </div>
      <Projects />
    </article>
  );
}
