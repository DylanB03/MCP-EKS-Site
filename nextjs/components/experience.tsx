import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      title: "Software and AI/ML Developer",
      company: "Nokia",
      location: "Ottawa, ON",
      period: "May 2025 - August 2025",
      description:
        "Developed a cloud-native multi-agent LLM system using Google A2A and MCP protocols, enabling chain-of-thought analysis and RAG pipelines for 5G core configuration. \n\n Increased retrieval accuracy by 26% by pivoting from vector databases to graph databases (Neo4j) and LangChain memory stores. \n\nPerformed Supervised Fine Tuning, KTO, and GRPO algorithms with QLoRA PEFT \n\nBuilt MCP servers for LLM tool calling, automating CRD deployment, scaling cloud resources, accessed via HTTP and SSE protocols via FastAPI. \n\nExposed context retrieval of structured and unstructured data using multi-modal, semantic, and lexical searches, integrating tools such as Docling.\n\nDeveloped containerized and backend services on Kubernetes and Crossplane environments with Docker. \n\nDelivered proof of concepts to executives, expanding technologies to company wide production teams. \n\nManaged two interns, helping them deliver through agile user stories, improving team velocity and code quality.",
      technologies: ["MCP", "A2A", "Kubernetes", "AI", "ML", "Python", "GRPO", "KTO", "Supervised Fine Tuning"],
    },
    {
      title: "Software Developer",
      company: "FIRST Robotics Earl of March",
      location: "Ottawa, ON",
      period: "September 2022 - June 2023",
      description:
        "Developed Java-based control software for robot systems, focusing on modular architecture, sensor integration, and path planning. \n\n Collaborated with teammates using Git, code reviews, and iterative testing cycles to deliver competition-ready robot software.",
      technologies: ["Java", "Object-Oriented Programming"],
    },
    {
      title: "Supervisor",
      company: "Farmboy Grocery Store",
      location: "Ottawa, ON",
      period: "June 2022 - November 2022",
      description:
        "Promoted after 3 months as a result of exceptional performance and general recommendations from superiors. \n\nDelegated tasks, managed the safe and cash balances, assigned break schedules, and handled conflict resolution while working additionally as a cashier.",
      technologies: ["Communication", "Management"],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My professional journey and the impact I've made at various organizations.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-gray-900">{exp.title}</CardTitle>
                    <p className="text-lg font-semibold text-orange-600">{exp.company}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 whitespace-pre-line">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
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
