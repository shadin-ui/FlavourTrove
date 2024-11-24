import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4
    }
  }
};

const RecipeCard = ({ recipe, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-xl overflow-hidden hover-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transform transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`} />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <motion.h3
          initial={false}
          animate={{ y: isHovered ? 0 : 5 }}
          className="text-lg font-medium mb-2"
        >
          {recipe.strMeal}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 'auto' : 0
          }}
          className="text-sm"
        >
          <p className="line-clamp-2">{recipe.strInstructions}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const FilterBar = ({ activeFilter, setActiveFilter, filters }) => {
  return (
    <div className="flex overflow-x-auto pb-2 mb-6 gap-2 hide-scrollbar">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeFilter === filter
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
};

const NoResults = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12"
  >
    <div className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600">
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
      No recipes found
    </h3>
    <p className="text-gray-500 dark:text-gray-400">
      Try adjusting your search or filters to find what you're looking for
    </p>
  </motion.div>
);

export default function SearchResults({ recipes = [], onRecipeClick }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  const filters = ['All', 'Quick & Easy', 'Vegetarian', 'Desserts', 'Main Course'];

  const filteredRecipes = recipes.filter(recipe => {
    if (activeFilter === 'All') return true;
    // Add your filter logic here
    return true;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'name') {
      return a.strMeal.localeCompare(b.strMeal);
    }
    // Add more sorting options here
    return 0;
  });

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
            Search Results
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Found {recipes.length} recipes
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input py-1"
          >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="time">Cooking Time</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded ${
                view === 'grid'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded ${
                view === 'list'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filters={filters}
      />

      {/* Results */}
      <AnimatePresence mode="wait">
        {sortedRecipes.length > 0 ? (
          <motion.div
            key="results"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={`grid gap-6 ${
              view === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {sortedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() => onRecipeClick(recipe)}
              />
            ))}
          </motion.div>
        ) : (
          <NoResults key="no-results" />
        )}
      </AnimatePresence>
    </div>
  );
}
