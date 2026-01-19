const Contact = () => {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-2xl font-semibold text-purple-400 mb-6">
        /contact
      </h2>

      <p className="text-gray-400 mb-6">
        Want to work together or have a question?
      </p>

      <a
        href="mailto:azzeddine@email.com"
        className="inline-block px-6 py-3 border border-purple-500 text-purple-400 rounded-md hover:bg-purple-500 hover:text-black transition"
      >
        Send Email
      </a>
    </section>
  );
};

export default Contact;
