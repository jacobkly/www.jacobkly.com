import About from "@/components/About";
import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";
import { FileDown, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const JACOB_DOB = new Date(2005, 3, 9);
const LIMIT = 4;

function getAge(dob: Date) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export default async function Home() {
  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <Image
          className="size-56 rounded-lg lg:size-64 3xl:size-72"
          src="/jacob.jpg"
          alt="Photo of Jacob"
          width={288}
          height={288}
          priority
        />
        <div className="flex flex-col">
          <h1 className="title text-5xl font-serif lg:text-6xl 3xl:text-7xl">
            heyy jacob here 👋
          </h1>
          <p className="mt-2 font-medium lg:text-lg 3xl:text-xl">
            {getAge(JACOB_DOB)}
            yo software engineer from Washington
          </p>
          <p className="mt-8 max-w-sm lg:max-w-md lg:text-lg">
            full stack dev by day, musician by night.
          </p>

          <section className="mt-8 flex items-center gap-8">
            <Link href="/jacob_klymenko_resume.pdf" target="_blank">
              <Button variant="outline" className="cursor-pointer">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>

      <About />

      <Experience />

      <section className="flex flex-col gap-8">
        <h2 className="title text-2xl sm:text-3xl font-serif">skills</h2>
        <Skills />
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl font-serif">featured projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
            external={false}
          />
        </div>
        <Projects limit={LIMIT} />
      </section>

    </article >
  );
}