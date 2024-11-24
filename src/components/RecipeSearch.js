import { useState } from 'react'

export default function RecipeSearch() {
  const [recipes, setRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [loading, setLoading] = useState(false)

  const searchRecipes = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`)
      const data = await response.json()
      setRecipes(data.meals || [])
    } catch (error) {
      setRecipes([])
    }
    setLoading(false)
  }

  const getRecipeDetails = async (id) => {
    setLoading(true)
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      const data = await response.json()
      setSelectedRecipe(data.meals[0])
    } catch (error) {
      setSelectedRecipe(null)
    }
    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchRecipes()
    }
  }

  return (
    <section id="recipes" className="py-16 bg-gray-50/50 backdrop-blur-sm relative overflow-hidden">
      <div className="gradient-orb w-96 h-96 top-1/2 right-0 translate-x-1/2 -translate-y-1/2 floating-delayed" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold sm:text-4xl font-fancy gradient-text animate-gradient">
            Find Your Perfect Recipe
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Enter an ingredient to discover delicious recipes
          </p>
        </div>

        <div className="flex gap-4 mb-8 max-w-3xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter ingredients (e.g., chicken)"
            className="flex-1 p-3 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
          <button
            onClick={searchRecipes}
            disabled={loading}
            className="button-glow px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all disabled:opacity-50 font-fancy font-medium hover:shadow-lg hover:-translate-y-0.5"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : selectedRecipe ? (
          <div className="glass-card rounded-xl p-6 scale-up">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="button-glow mb-4 text-primary-500 hover:text-primary-600 font-fancy font-medium"
            >
              ← Back to results
            </button>
            <div className="grid md:grid-cols-2 gap-8">
              <img
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
                className="w-full rounded-lg shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-bold mb-4 font-fancy gradient-text">{selectedRecipe.strMeal}</h2>
                <h3 className="text-xl font-semibold mb-2 font-fancy gradient-text">Ingredients:</h3>
                <ul className="mb-4 space-y-1">
                  {Array.from({ length: 20 }, (_, i) => i + 1)
                    .filter(i => selectedRecipe[`strIngredient${i}`])
                    .map(i => (
                      <li key={i} className="hover-lift p-2 glass-card rounded-lg mb-2">
                        {selectedRecipe[`strIngredient${i}`]} - {selectedRecipe[`strMeasure${i}`]}
                      </li>
                    ))}
                </ul>
                <h3 className="text-xl font-semibold mb-2 font-fancy gradient-text">Instructions:</h3>
                <p className="whitespace-pre-line text-gray-600">{selectedRecipe.strInstructions}</p>
                {selectedRecipe.strYoutube && (
                  <div className="mt-4">
                    <a
                      href={selectedRecipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-glow text-primary-500 hover:text-primary-600 font-fancy font-medium inline-block"
                    >
                      Watch Video Tutorial →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <div
                key={recipe.idMeal}
                className="glass-card rounded-xl overflow-hidden hover-lift cursor-pointer"
                onClick={() => getRecipeDetails(recipe.idMeal)}
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 font-fancy gradient-text">{recipe.strMeal}</h2>
                  <button className="button-glow text-primary-500 hover:text-primary-600 font-fancy font-medium">
                    View Recipe →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
