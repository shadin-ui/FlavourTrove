export default function About() {
  const features = [
    {
      title: "Simple Search",
      description: "Enter ingredients you have, and discover recipes you can make right now"
    },
    {
      title: "Clear Instructions",
      description: "Follow easy-to-understand steps with precise measurements for perfect results"
    },
    {
      title: "Global Recipes",
      description: "Explore diverse dishes from various cuisines around the world"
    }
  ]

  return (
    <section id="about" className="py-24 bg-primary-50/50 backdrop-blur-sm relative overflow-hidden">
      <div className="gradient-orb w-96 h-96 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 floating" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-fancy gradient-text animate-gradient">
            Cooking Made Simple
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover the joy of cooking with our intuitive recipe finder
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-8 rounded-xl hover-lift">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold font-fancy gradient-text">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
