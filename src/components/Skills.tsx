import data from "@/data/skills.json";
import { skillsSchema } from "@/lib/schemas";

export default function Skills() {
    const { categories } = skillsSchema.parse(data);

    return (
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 2xl:grid-cols-2">
            {categories.map((category) => (
                <div key={category.name} className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                        {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {category.items.map((skill) => (
                            <div
                                key={skill}
                                className="rounded-md border bg-transparent px-3 py-1 text-sm text-center w-fit transition-transform duration-200 hover:scale-105"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
