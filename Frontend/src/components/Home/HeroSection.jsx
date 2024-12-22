const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-6">
            Etdecken. Analysieren. Investieren.
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            EIhre umfassende Plattform zur Erkundung, Analyse und Verständnis
            von Finanzinstrumenten auf globalen Märkten. Von ETFs bis zu
            Investmentfonds – wir bieten tiefgreifende Einblicke, um Ihre
            Anlageentscheidungen zu unterstützen.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default HeroSection;
