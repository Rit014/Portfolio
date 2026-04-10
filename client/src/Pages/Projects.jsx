import { Project } from "../Components/Project";

const PROJECTS = [
    {
        title: "ShopFlow E-commerce",
        description: "A full MERN store with Redux Toolkit and JWT Auth.",
        tech: ["React", "Node.js", "MongoDB", "Redux"],
        live: "https://your-live-site.com",
        github: "https://github.com/your-repo"
    }
];

const Projects = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-[#7fd4a0] mb-8">Projects</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {PROJECTS.map(p => (
                    <Project key={p.title} project={p} />
                ))}
            </div>
        </div>
    );
};

export default Projects;