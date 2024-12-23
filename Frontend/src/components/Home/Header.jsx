import { TrendingUp } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <TrendingUp className="text-blue-600 mr-2" size={30} />
          <h1 className="text-2xl font-bold text-gray-800">
            Financial Horizon
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
