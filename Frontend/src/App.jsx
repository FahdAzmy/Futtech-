import HeroSection from "./components/HeroSection";
import "./index.css";
import FinancialPlatformDashboard from "./Pages/FinancialPlatformDashboard";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FinancialPlatformDashboard />
    </div>
  );
}

export default App;
