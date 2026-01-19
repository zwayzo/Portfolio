import reactLogo from "../assets/react.svg";
import jsLogo from "../assets/docker.svg";
import htmlLogo from "../assets/html5.svg";
import cssLogo from "../assets/css.svg";
import flaskLogo from "../assets/flask.svg";
import postgresLogo from "../assets/postgresql.svg";

const skills = [
  { name: "React", icon: reactLogo },
  { name: "docker", icon: jsLogo },
  { name: "HTML", icon: htmlLogo },
  { name: "CSS", icon: cssLogo },
  { name: "Flask", icon: flaskLogo },
  { name: "PostgreSQL", icon: postgresLogo },
];

const Skills = () => {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-2xl font-semibold text-purple-400 mb-10">
        /skills
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-4 bg-[#020617] border border-white/10 p-4 rounded-lg hover:border-purple-400 transition"
          >
            <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
