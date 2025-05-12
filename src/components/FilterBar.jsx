import React from "react";

export default function FilterBar({
  allSources,
  allIndividuals,
  selectedSources,
  selectedIndividuals,
  keywordFilter,
  impactFilter,
  activeDropdown,
  toggleDropdown,
  toggleSelection,
  setSelectedSources,
  setSelectedIndividuals,
  setKeywordFilter,
  setImpactFilter,
}) {
  return (
    <div className="flex flex-col items-center space-y-6 mt-10">
      {/* Filters Title */}
      <div className="flex items-center w-full justify-center">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#6a805b] to-transparent"></div>
        <span className="mx-6 text-[#6a805b] text-2xl font-semibold tracking-wider">Filters</span>
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#6a805b] to-transparent"></div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-6 max-[450px]:space-x-3">
        {["Sources", "Individuals", "Keywords", "Impact"].map((label) => {
          const key = label.toLowerCase();
          const isOpen = activeDropdown === key;
          const arrow = isOpen ? "▴" : "▾";
          return (
            <button
              key={key}
              onClick={() => toggleDropdown(key)}
              className="text-[#E3DCCF] font-semibold text-lg max-[450px]:text-base hover:text-[#F5E9D0] transition-colors duration-200"
            >

              <span className="hidden max-[560px]:inline"></span>
              <span className="max-[560px]:hidden">{arrow}</span> {label}
            </button>
          );
        })}
      </div>

      {/* Dropdown Content */}
      {activeDropdown && (
        <div className="mt-6 w-full max-w-3xl bg-[#2F403C] p-6 rounded-xl shadow animate-fade space-y-4">
          {activeDropdown === "sources" && (
            <div className="space-y-2">
              {allSources.map((source) => (
                <button
                  key={source}
                  onClick={() => toggleSelection(source, selectedSources, setSelectedSources)}
                  className={`px-3 py-1 rounded ${
                    selectedSources.includes(source)
                      ? "bg-[#6FCF97] text-black"
                      : "bg-[#374C44] text-white"
                  }`}
                >
                  {source}
                </button>
              ))}

              {selectedSources.length > 0 && (
                <button
                  onClick={() => setSelectedSources([])}
                  className="text-xs text-[#aaa] hover:text-white underline mt-2"
                >
                  Clear Selection
                </button>
              )}
            </div>
          )}

          {activeDropdown === "individuals" && (
            <div className="space-y-2">
              {allIndividuals.map((individual) => (
                <button
                  key={individual}
                  onClick={() => toggleSelection(individual, selectedIndividuals, setSelectedIndividuals)}
                  className={`px-3 py-1 rounded ${
                    selectedIndividuals.includes(individual)
                      ? "bg-[#6FCF97] text-black"
                      : "bg-[#374C44] text-white"
                  }`}
                >
                  {individual}
                </button>
              ))}

              {selectedIndividuals.length > 0 && (
                <button
                  onClick={() => setSelectedIndividuals([])}
                  className="text-xs text-[#aaa] hover:text-white underline mt-2"
                >
                  Clear Selection
                </button>
              )}
            </div>
          )}

          {activeDropdown === "keywords" && (
            <div className="relative">
              <input
                type="text"
                value={keywordFilter}
                onChange={(e) => setKeywordFilter(e.target.value)}
                className="w-full p-2 bg-[#1F2A24] text-white rounded pr-10"
                placeholder="Enter keyword..."
              />
              {keywordFilter && (
                <button
                  onClick={() => setKeywordFilter("")}
                  className="absolute right-3 top-2 text-[#aaa] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {activeDropdown === "impact" && (
            <div className="space-x-4">
              {["all", "medium", "high"].map((level) => (
                <button
                  key={level}
                  onClick={() => setImpactFilter(level)}
                  className={`px-3 py-1 rounded ${
                    impactFilter === level
                      ? "bg-[#6FCF97] text-black"
                      : "bg-[#374C44] text-white"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
