import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code2 } from 'lucide-react';
// import jsIcon from './assets/javascript.svg';
import pythonIcon from './assets/python.svg';
import reactIcon from './assets/react.svg';
import htmlIcon from './assets/html5.svg';
import phpIcon from './assets/php.svg';
import gitIcon from './assets/git.svg';
import dockerIcon from './assets/docker.svg';
import flaskIcon from './assets/flask.svg';
import drupalIcon from './assets/drupal.svg';
import postgresqlIcon from './assets/postgresql.svg';
import sqlalchemyIcon from './assets/sqlalchemy.svg';
import wordpressIcon from './assets/wordpress.svg';
import cIcon from './assets/c.svg'
import cppIcon from './assets/cplusplus.svg'
import djangoIcon from './assets/django.svg'
import figmaIcon from './assets/figma.svg'
import mongodbIcon from './assets/mongodb.svg'
import sqliteIcon from './assets/sqlite.svg'
import me from "./assets/me.jpeg"; // adjust path if needed
import cyberPong from "./assets/tranc.png"
import iwri from './assets/iwri.png'
import inception from './assets/inception.jpg'
import linder from './assets/linder.png'
import minishell from './assets/minishell.gif'
import webserv from './assets/webserv.webp'
import camagru from './assets/camagru.png'
import { code } from 'framer-motion/client';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.dataset.animate]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const isVisible = (id) => visibleElements.has(id);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 transform transition-transform hover:scale-110">
              <Code2 className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold">Azzeddine Mohammed</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`hover:text-purple-400 transition-all hover:scale-110 ${
                    activeSection === item ? 'text-purple-400' : 'text-gray-300'
                  }`}
                >
                  <span className="text-purple-400">#</span>{item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 transition-transform hover:scale-110"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 animate-slide-down">
            <div className="px-4 py-4 space-y-3">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left hover:text-purple-400 transition-all hover:translate-x-2"
                >
                  <span className="text-purple-400">#</span>{item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl w-full">
          <div className="space-y-6">
            <div 
              data-animate="hero-greeting"
              className={`text-purple-400 text-lg transition-all duration-700 ${
                isVisible('hero-greeting') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              Hi, my name is
            </div>
            <h1 
              data-animate="hero-name"
              className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-700 delay-150 ${
                isVisible('hero-name') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              Azzeddine Mohammed
            </h1>
            <h2 
              data-animate="hero-title"
              className={`text-3xl md:text-5xl font-bold text-gray-300 transition-all duration-700 delay-300 ${
                isVisible('hero-title') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              I build things for the web.
            </h2>
            <p 
              data-animate="hero-desc"
              className={`text-lg text-gray-400 max-w-2xl transition-all duration-700 delay-500 ${
                isVisible('hero-desc') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              A Wise man says once said The Talk is cheap, Show me the code.
            </p>
            <div 
              data-animate="hero-buttons"
              className={`flex space-x-4 pt-4 transition-all duration-700 delay-700 ${
                isVisible('hero-buttons') ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 transition-all duration-300 rounded hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-purple-400 text-gray-900 hover:bg-purple-500 transition-all duration-300 rounded hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-20 flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 
            data-animate="about-title"
            className={`text-4xl font-bold mb-12 transition-all duration-700 ${
              isVisible('about-title') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <span className="text-purple-400">/</span>about-me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              data-animate="about-text"
              className={`space-y-4 text-gray-300 transition-all duration-700 delay-200 ${
                isVisible('about-text') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              <p className="text-lg">Who am I?</p>
              <p>
              I’m Azzeddine Mohammed, a passionate developer who enjoys turning ideas into real, working products.
              </p>
              <p>
              I love building web applications, exploring backend logic, and connecting people through technology.
              </p>
              <p>
              Curious by nature, I’m always learning—whether it’s improving my code structure, exploring new frameworks, or refining user experience. I believe growth comes from building, breaking, and rebuilding better.
              </p>
            </div>
            <div 
              data-animate="about-image"
              className={`relative transition-all duration-700 delay-400 ${
                isVisible('about-image') ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-90'
              }`}
            >
              <div className="w-full aspect-square bg-gray-800 rounded-lg border-2 border-purple-400/30 overflow-hidden relative group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-purple-400/10 group-hover:bg-transparent transition-all duration-300"></div>
                <div className="absolute top-4 right-4 grid grid-cols-5 gap-2">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-6xl">
                <img
                    src= {me}  // put the image in /public
                    alt="Azzeddine Mohammed"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-4 py-20 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 
            data-animate="projects-title"
            className={`text-4xl font-bold mb-4 transition-all duration-700 ${
              isVisible('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <span className="text-purple-400">/</span>projects
          </h2>
          <p 
            data-animate="projects-subtitle"
            className={`text-gray-400 mb-12 transition-all duration-700 delay-200 ${
              isVisible('projects-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            List of my projects
          </p>

          <div className="mb-12">
            <h3 
              data-animate="complete-apps-title"
              className={`text-2xl font-bold mb-6 text-purple-400 transition-all duration-700 ${
                isVisible('complete-apps-title') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              #complete-apps
            </h3>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Camagru', 
                tech: 'Js, Html/css, Php, MysQl', 
                desc: 'Camagru is a full-stack web application inspired by social media platforms, designed to allow users to capture, edit, and share photos online. The project focuses on building a complete photo-sharing system from scratch, including user authentication, image manipulation, and social interactions such as likes and comments.',
                image: camagru, // Add your image path here
                code: 'https://github.com/zwayzo/camagru'
              },
              { 
                title: 'Web Application', 
                tech: 'Js, Html/css, RestApi, Django, PostgreSql', 
                desc: 'CyberPong is a web-based application centered around the classic game Pong, enabling users to play real-time multiplayer games and participate in tournaments. Designed to enhance technical expertise, this project offers opportunities to explore advanced features, such as user management, AI opponents, advanced graphics, and scalable infrastructure.',
                image: cyberPong, // Add your image path here
                code: 'https://github.com/Bettercallous/CyberPong'
              },
              { 
                title: 'Social Media Application', 
                tech: 'Flask, React, RestApi, js, PostgreSQL, Sqlalchemy', 
                desc: 'Linder is a web application that blends the professional networking features of LinkedIn with the swipe-based matching experience of Tinder The platform allows users to create detailed professional profiles and discover relevant connections based on industry, experience level, and interests. The goal of Linder is to make professional networking more intuitive, engaging, and human-centered',
                image: linder, // Add your image path here
                code: 'https://github.com/emohamedd/Linder'
              },
              { 
                title: 'Institute Website', 
                tech: 'wordpress, php, Drupal', 
                desc: 'I built WordPress-based website developed to present institutional content in a clear, structured, and accessible way The project focuses on delivering a responsive design, easy content management, and a scalable structure that allows non-technical users to publish and update content efficiently',
                image: iwri, // Add your image path here
                code: 'https://github.com/zwayzo/IWRI'
              }
            ].map((project, idx) => (
              <div
                key={idx}
                data-animate={`project-${idx}`}
                className={`bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-400 transition-all duration-500 group hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-400/20 ${
                  isVisible(`project-${idx}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="mb-4">
                  <div className="w-full h-40 bg-gray-900 rounded mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">{project.tech}</p>
                <h4 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
               <div className="flex space-x-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-transparent border border-purple-400 text-purple-400 rounded text-sm hover:bg-purple-400 hover:text-gray-900 transition-all flex items-center space-x-2 hover:scale-105"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 transition-all hover:scale-105"
                    >
                      Code
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
          
          
          
          
          
          </div>




          <div>
            <h3 
              data-animate="small-projects-title"
              className={`text-2xl font-bold mb-6 text-purple-400 transition-all duration-700 ${
                isVisible('small-projects-title') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              #small-projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Inception', 
                tech: 'Docker, Nginex, Mariadb, Wordpress', 
                desc: 'Inception is a DevOps-focused project from the 42 CC cursus that consists of setting up a complete web infrastructure using Docker and Docker Compose. It includes containerized services such as Nginx, WordPress, and MariaDB, configured with secure networking, environment variables, and persistent volumes, following best DevOps practices.',
                code: 'https://github.com/zwayzo/inception',
                image: inception // Add your image path here
              },
              { 
                title: 'Webserv', 
                tech: 'c++98', 
                desc: 'The Webserv project involves implementing a custom web server in C++, capable of handling multiple clients concurrently using non-blocking I/O. It supports HTTP methods such as GET, POST, and DELETE, serves static content, executes CGI scripts, and manages configuration through a custom config file format inspired by Nginx.',
                code: 'https://github.com/zwayzo/webserv',
                image: minishell // Add your image path here
              },
              { 
                title: 'Minishell', 
                tech: 'c', 
                desc: 'The Minishell project consists of implementing a custom shell in C, supporting features such as command execution, pipelines, redirections, environment variables, and built-in commands. Special attention is given to signals, exit codes, and accurate Bash-like behavior.',
                code: 'https://github.com/zwayzo/minishell-42',
                image: webserv // Add your image path here
              }
            ].map((project, idx) => (
              <div
                key={idx}
                data-animate={`project-${idx}`}
                className={`bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-400 transition-all duration-500 group hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-400/20 ${
                  isVisible(`project-${idx}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="mb-4">
                  <div className="w-full h-40 bg-gray-900 rounded mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">{project.tech}</p>
                <h4 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                <div className="flex space-x-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-transparent border border-purple-400 text-purple-400 rounded text-sm hover:bg-purple-400 hover:text-gray-900 transition-all flex items-center space-x-2 hover:scale-105"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 transition-all hover:scale-105"
                    >
                      Code
                    </a>
                  )}
                </div>


              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-4 py-32 px-4 py-32">
        <div className="max-w-6xl mx-auto">
          <h2 
            data-animate="skills-title"
            className={`text-4xl font-bold mb-12 transition-all duration-700 ${
              isVisible('skills-title') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <span className="text-purple-400">#</span>skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Languages', 
                items: [
                  { name: 'C', icon: <img src={cIcon} className="w-6 h-6 brightness-0 invert" alt="C" /> },
                  { name: 'cpp', icon: <img src={cppIcon} className="w-6 h-6 brightness-0 invert" alt="cpp" /> },
                  { name: 'Python', icon: <img src={pythonIcon} className="w-6 h-6 brightness-0 invert" alt="python" /> },
                  { name: 'HTML/CSS', icon: <img src={htmlIcon} className="w-6 h-6 brightness-0 invert" alt="html" /> },
                  { name: 'Php', icon: <img src={phpIcon} className="w-6 h-6 brightness-0 invert" alt="html" /> }
                ]
              },
              { 
                title: 'Frameworks', 
                items: [
                  { name: 'React', icon: <img src={reactIcon} className="w-6 h-6 brightness-0 invert" alt="react" /> },
                  { name: 'Django', icon: <img src={djangoIcon} className="w-6 h-6 brightness-0 invert" alt="django" /> },
                  { name: 'Flask', icon: <img src={flaskIcon} className="w-6 h-6 brightness-0 invert" alt="flask" /> },
                  // { name: 'Express', icon: '🚂' }
                ]
              },
              { 
                title: 'Tools and CMS', 
                items: [
                  { name: 'Git', icon: <img src={gitIcon} className="w-6 h-6 brightness-0 invert" alt="git" /> },
                  { name: 'Docker', icon: <img src={dockerIcon} className="w-6 h-6 brightness-0 invert" alt="docker" /> },
                  { name: 'Figma', icon: <img src={figmaIcon} className="w-6 h-6 brightness-0 invert" alt="figma" /> },
                  { name: 'Wordpress', icon: <img src={wordpressIcon} className="w-6 h-6 brightness-0 invert" alt="wordpress" /> },
                  { name: 'Drupal', icon: <img src={drupalIcon} className="w-6 h-6 brightness-0 invert" alt="drupal" /> }
                  
                ]
              },
              { 
                title: 'Databases', 
                items: [
                  { name: 'MongoDB', icon: <img src={mongodbIcon} className="w-6 h-6 brightness-0 invert" alt="git" /> },
                  { name: 'PostgreSQL', icon: <img src={postgresqlIcon} className="w-6 h-6 brightness-0 invert" alt="postgresql" /> },
                  { name: 'sqlalchem', icon: <img src={sqlalchemyIcon} className="w-6 h-6 brightness-0 invert" alt="sqlalchemyIcon" />},
                  { name: 'sqlite', icon: <img src={sqliteIcon} className="w-6 h-6 brightness-0 invert" alt="sqliteyIcon" />},
                ]
              }
            ].map((category, idx) => (
              <div 
                key={idx}
                data-animate={`skill-category-${idx}`}
                className={`bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-400 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-400/20 ${
                  isVisible(`skill-category-${idx}`) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400">{category.title}</h3>
                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-all cursor-default hover:translate-x-2 group"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 
              data-animate="fun-facts-title"
              className={`text-2xl font-bold mb-6 text-purple-400 transition-all duration-700 ${
                isVisible('fun-facts-title') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              #fun-facts
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'I love coding at night',
                'Coffee enthusiast ☕',
                'Open source contributor',
                'Always learning new tech',
                'Problem solver',
                'Team player'
              ].map((fact, idx) => (
                <div
                  key={idx}
                  data-animate={`fun-fact-${idx}`}
                  className={`px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 hover:border-purple-400 hover:text-purple-400 transition-all cursor-default hover:scale-110 ${
                    isVisible(`fun-fact-${idx}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {fact}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 py-32 flex items-center px-4 py-32">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 
            data-animate="contact-title"
            className={`text-4xl font-bold mb-6 transition-all duration-700 ${
              isVisible('contact-title') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <span className="text-purple-400">/</span>get-in-touch
          </h2>
          <p 
            data-animate="contact-desc"
            className={`text-xl text-gray-400 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible('contact-desc') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            I’m always excited to collaborate on new projects or just chat about technology, design, or ideas. Whether you have a project in mind, a question, or just want to say hi, feel free to reach out.
          </p>
          <div 
            data-animate="contact-socials"
            className={`flex justify-center space-x-6 mb-12 transition-all duration-700 delay-400 ${
              isVisible('contact-socials') ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            {[ 
              { Icon: Github, href: "https://github.com/zwayzo" }, 
              { Icon: Linkedin, href: "https://www.linkedin.com/in/azzeddine-mohammed-66125b274/" }, 
              { Icon: Mail, href: "mailto:azzeddine.simohammed@gmail.com" } 
            ].map(({ Icon, href }, idx) => (
              <a 
                key={idx}
                href={href} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:border-purple-400 hover:text-purple-400 transition-all hover:scale-125 hover:rotate-12"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <a
            data-animate="contact-button"
            href="mailto:your.email@example.com"
            className={`inline-block px-8 py-3 bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 transition-all duration-300 rounded text-lg hover:scale-110 ${
              isVisible('contact-button') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 Azzeddine Mohammed. Built with React & Tailwind CSS</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
