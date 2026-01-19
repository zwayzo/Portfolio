import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Hi, I’m <span className="text-purple-400">Azzeddine</span> 👋
        </h1>

        <p className="mt-4 text-gray-400 text-lg">
          Web Developer — building clean, practical, and scalable web applications.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-purple-500 text-black rounded-md font-medium hover:bg-purple-400 transition"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="px-6 py-3 border border-purple-500 text-purple-400 rounded-md hover:bg-purple-500 hover:text-black transition"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
