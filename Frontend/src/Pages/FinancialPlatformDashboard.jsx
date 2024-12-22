import SearchInputAndFilter from "../components/Home/SearchInputAndFilter";
import InsurmentsFilter from "../components/Home/InsurmentsFilter";
// import SearchInputAndFilter from "../components/SearchInputAndFilter";

const FinancialPlatformDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Finanzinstrumente Übersicht
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Entdecken Sie umfassende Informationen zu verschiedenen
          Finanzinstrumenten mit detaillierten Einblicken und präzisen Daten.
        </p>
      </header>
      <SearchInputAndFilter />
      <InsurmentsFilter />
    </div>
  );
};

export default FinancialPlatformDashboard;
