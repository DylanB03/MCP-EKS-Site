import { Card, CardContent } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about my journey, skills, and what drives me as a software engineer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="/bigpic.jpg?height=400&width=400" alt="About me" className="rounded-lg shadow-lg w-full" />
          </div>

          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              I'm a passionate AI/ML and cloud developer with experience building MCP servers and autonomous agents using A2A and LangGraph/Chain for 5G configuration from the ground up.
              In my free time, I like to play video games, classical guitar, and play sports.
            </p>

            <p className="text-gray-600 leading-relaxed">
              I specialize in modern AI technologies and frameworks, cloud networking, and creating agents that solve complex probles. 
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">Top 0.01%</div>
                  <div className="text-sm text-gray-600">In Valorant and League of Legends</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">3+</div>
                  <div className="text-sm text-gray-600">Years of Dev Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
