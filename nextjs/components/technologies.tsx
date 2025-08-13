import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Technologies() {
  const technologies = [
    { name: "Python", image: "/tech/python.png?height=60&width=60" },
    { name: "Knowlede Graphs", image: "/tech/kg.svg?height=60&width=60" },
    { name: "MCP", image: "/tech/MCP.png?height=60&width=60" },
    { name: "A2A", image: "/tech/a2a.png?height=60&width=60" },
    { name: "Lang Graph", image: "/tech/langgraph.png?height=60&width=60" },
    { name: "Lang Chain", image: "/tech/langchain.png?height=60&width=60" },
    { name: "RL/ML", image: "/tech/RL.jpg?height=60&width=60" },
    { name: "Java", image: "/tech/java.webp?height=60&width=60" },
    { name: "C", image: "/tech/c.png?height=60&width=60" },
    { name: "Linux", image: "/tech/linux.png?height=60&width=60" },
    { name: "Docker", image: "/tech/docker.png?height=60&width=60" },
    { name: "AWS", image: "/tech/aws.png?height=60&width=60" },
    { name: "Kubernetes", image: "/tech/k8s.png?height=60&width=60" },
    { name: "REST API", image: "/tech/rest.jpg?height=60&width=60" },
    { name: "FastAPI", image: "/tech/fast.png?height=60&width=60" },
    { name: "MySQL", image: "/tech/sql.png?height=60&width=60" },
    { name: "Neo4j", image: "/tech/neo4j.png?height=60&width=60" },
    { name: "Next.js", image: "/tech/nextjs.png?height=60&width=60" },
    { name: "React", image: "/tech/react.png?height=60&width=60" },
    { name: "Git", image: "/tech/git.svg?height=60&width=60" },
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

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 text-center">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {technologies.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center group">
                  <div className="w-16 h-16 mb-3 p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100 group-hover:scale-105 transform duration-200">
                    <img
                      src={tech.image || "/placeholder.svg"}
                      alt={`${tech.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center group-hover:text-orange-600 transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
