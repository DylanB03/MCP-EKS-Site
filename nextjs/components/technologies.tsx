import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Technologies() {
  const techCategories = [
    {
      title: "Frontend",
      technologies: [
        { name: "React", image: "/placeholder.svg?height=60&width=60" },
        { name: "Next.js", image: "/placeholder.svg?height=60&width=60" },
        { name: "TypeScript", image: "/placeholder.svg?height=60&width=60" },
        { name: "Vue.js", image: "/placeholder.svg?height=60&width=60" },
        { name: "Tailwind CSS", image: "/placeholder.svg?height=60&width=60" },
        { name: "JavaScript", image: "/placeholder.svg?height=60&width=60" },
      ],
    },
    {
      title: "Backend",
      technologies: [
        { name: "Node.js", image: "/placeholder.svg?height=60&width=60" },
        { name: "Python", image: "/placeholder.svg?height=60&width=60" },
        { name: "Express.js", image: "/placeholder.svg?height=60&width=60" },
        { name: "FastAPI", image: "/placeholder.svg?height=60&width=60" },
        { name: "GraphQL", image: "/placeholder.svg?height=60&width=60" },
        { name: "REST API", image: "/placeholder.svg?height=60&width=60" },
      ],
    },
    {
      title: "Database",
      technologies: [
        { name: "PostgreSQL", image: "/placeholder.svg?height=60&width=60" },
        { name: "MongoDB", image: "/placeholder.svg?height=60&width=60" },
        { name: "Redis", image: "/placeholder.svg?height=60&width=60" },
        { name: "MySQL", image: "/placeholder.svg?height=60&width=60" },
        { name: "Prisma", image: "/placeholder.svg?height=60&width=60" },
        { name: "Supabase", image: "/placeholder.svg?height=60&width=60" },
      ],
    },
    {
      title: "DevOps & Tools",
      technologies: [
        { name: "AWS", image: "/placeholder.svg?height=60&width=60" },
        { name: "Docker", image: "/placeholder.svg?height=60&width=60" },
        { name: "Git", image: "/placeholder.svg?height=60&width=60" },
        { name: "GitHub", image: "/placeholder.svg?height=60&width=60" },
        { name: "Kubernetes", image: "/placeholder.svg?height=60&width=60" },
        { name: "Vercel", image: "/placeholder.svg?height=60&width=60" },
      ],
    },
  ]

  return (
    <section id="technologies" className="py-20 bg-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Technologies & Skills</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My technical expertise across different domains of software development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {techCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {category.technologies.map((tech) => (
                    <div key={tech.name} className="flex flex-col items-center group">
                      <div className="w-16 h-16 mb-3 p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                        <img
                          src={tech.image || "/placeholder.svg"}
                          alt={`${tech.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
