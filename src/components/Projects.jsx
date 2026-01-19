import { motion } from "framer-motion";

const projects = [
  { title: "Kahoot Answers", tech: "React • Flask" },
  { title: "ProtectX", tech: "Security • Flask" },
  { title: "Portfolio", tech: "React • Tailwind" },
];

const Projects = () => {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-2xl font-semibold text-purple-400 mb-10">
        /projects
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-[#020617] border border-white/10 rounded-lg p-6"
          >
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{p.tech}</p>

            <button className="mt-4 text-purple-400 text-sm hover:underline">
              View →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
