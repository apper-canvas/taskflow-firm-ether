import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search tasks...", 
  className,
  autoFocus = false 
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <motion.div 
      className={cn("relative", className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon 
          name="Search" 
          className={cn(
            "w-4 h-4 transition-colors duration-200",
            isFocused ? "text-primary-500" : "text-gray-400"
          )} 
        />
      </div>
      <Input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          "pl-10 pr-10 bg-white/80 backdrop-blur-sm",
          query && "pr-10"
        )}
      />
      {query && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default SearchBar;