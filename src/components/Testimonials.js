export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Chef",
      content: "FlavourTrove has transformed my cooking experience. I love how easy it is to find recipes based on what I have in my kitchen."
    },
    {
      name: "Michael Chen",
      role: "Food Enthusiast",
      content: "The detailed instructions and measurements make it impossible to go wrong. This is my go-to recipe app now!"
    },
    {
      name: "Emma Davis",
      role: "Busy Parent",
      content: "Quick, easy, and delicious recipes that my whole family loves. FlavourTrove has made meal planning so much easier."
    }
  ]

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="font-medium text-gray-900">{testimonial.name}</div>
              <div className="text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
