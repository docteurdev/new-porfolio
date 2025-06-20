import { ArrowRight, ExternalLink, Eye, Github } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ImageSliderModal from "./ui/Modal";

const projects = [
  {
    id: 1,
    title: "Alt Connect",
    description: "The first legal matchmaking platform in Africa.",
    image: "/projects/alt.png",
    tags: ["Nuxt js", "TailwindCSS", "Express js", "MySQL"],
    demoUrl: "https://altconnect.africa/",
    githubUrl: "#",
    type: "web",
    capture: []
  },
  {
    id: 2,
    title: "Coumbassa & Sanden",
    description: "Official website of the company.",
    image: "/projects/cs-cap.png",
    tags: ["Nuxt js", "TailwindCSS", "Express js", "MySQL"],
    demoUrl: "https://coumbassa-sanden.com/",
    githubUrl: "#",
    type: "web",
    capture: []
  },
  {
    id: 3,
    title: "Le Yoro de l'immo",
    description: "A dashboard for managing 3 types of users (Host, Professional, Seller).",
    image: "/projects/leyoro.png",
    tags: ["Next js", "TailwindCSS", "Express js", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "#",
    type: "web",
    capture: []
  },
  {
    id: 4,
    title: "Le Yoro de l'immo",
    description:
      "A mobile application for managing real estate listings and user interactions.",
    image: "/leyoro-screen/icon.png",
    tags: ["React native","Expo", "TypeScript"],
    demoUrl: "#",
    githubUrl: "#",
    type: "mobile",
    capture: []
  },
  {
    id: 5,
    title: "Toklo",
    description:
      "A mobile application for tailors, it helps them to manage their clients, appointments, sell creations and shocases thier work.",
    image: "/toklo-screen/logo.jpg",
    tags: ["React native", "Expo", "Tanstack query", "TypeScript"],
    demoUrl: "#",
    githubUrl: "#",
    type: "mobile",
    capture: [
    "/toklo-screen/register.jpg", 
    "/toklo-screen/login.jpg", 
    "/toklo-screen/dash.jpg",
    "/toklo-screen/measure.jpg",
    "/toklo-screen/order.jpg",
    "/toklo-screen/order-detail.jpg",
    "/toklo-screen/client.jpg",
    "/toklo-screen/client-detail.jpg",
    "/toklo-screen/add-model.jpg",
    "/toklo-screen/settings.jpg",
    "/toklo-screen/notif.jpg",
    "/toklo-screen/store-setting.jpg",
    "/toklo-screen/subscription.jpg",
  ]
  },
  // {
  //   id: 6,
  //   title: "Cst",
  //   description:
  //     "Full-featured e-commerce platform with user authentication and payment processing.",
  //   image: "/projects/project3.png",
  //   tags: ["React", "Node.js", "Stripe"],
  //   demoUrl: "#",
  //   githubUrl: "#",
  // },
];

const categories = ["all", "mobile", "web", ""];


export const ProjectsSection = () => {

   const [activeCategory, setActiveCategory] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState([]);
  
    const filteredProjects = projects.filter(
      (skill) => activeCategory === "all" || skill.type === activeCategory
    );

    // console.log("++++++++++++++++++++++++++", projects);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <ImageSliderModal
        images={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={selectedImageIndex}
      />
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {categories.map((category, key) => (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                        activeCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/70 text-forefround hover:bd-secondary"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
          {filteredProjects?.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>

                   {project?.capture.length > 0 && <a
                      onClick={() => {
                        if(!project.capture || project.capture.length === 0) return;
                        setSelectedProject(project.capture || []);
                        setIsModalOpen(true)
                      }}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Eye size={20} />
                    </a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://gitlab.com/docteurdev"
          >
            Check My Gitlab <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
