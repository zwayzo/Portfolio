const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0f172a]/80 backdrop-blur z-50 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-purple-400 font-semibold">Azzeddine</span>

        <ul className="flex gap-6 text-sm">
          <li><a href="#home" className="hover:text-purple-400">Home</a></li>
          <li><a href="#projects" className="hover:text-purple-400">Projects</a></li>
          <li><a href="#about" className="hover:text-purple-400">About</a></li>
          <li><a href="#contact" className="hover:text-purple-400">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
