/* eslint-disable react/prop-types */
import { Search, ChevronDown } from "lucide-react";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  filters,
  setFilters,
  filterOptions,
}) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-wrap gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search financial instruments..."
            className="w-full p-4 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-4 text-gray-400" size={24} />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <select
            className="appearance-none w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {instrumentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-5 text-gray-400"
            size={20}
          />
        </div>

        {/* Additional Filters */}
        {Object.keys(filterOptions).map((key) => (
          <div className="relative" key={key}>
            <select
              className="appearance-none w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters[key] || ""}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            >
              <option value="">All {key}</option>
              {filterOptions[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-5 text-gray-400"
              size={20}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
