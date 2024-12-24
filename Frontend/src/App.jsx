import HeroSection from "./components/Home/HeroSection";
import "./index.css";
import FinancialPlatformDashboard from "./Pages/FinancialPlatformDashboard";
import Header from "./components/Home/Header";
import { InstrumentsProvider } from "./Contexts/AllInsurmentsContext";

function App() {
  return (
    <div>
      <Header />
      <HeroSection />
      <InstrumentsProvider>
        <FinancialPlatformDashboard />
      </InstrumentsProvider>
    </div>
  );
}

export default App;
