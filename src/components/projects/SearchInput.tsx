import React from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="relative w-full sm:w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        className="bg-secondary/30 border border-primary/10 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 pr-10 py-2"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => onSearchChange("")}
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      )}
    </div>
  );
};
