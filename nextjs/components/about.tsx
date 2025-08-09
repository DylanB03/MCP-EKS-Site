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
              I'm a passionate full-stack software engineer with over 5 years of experience building web applications
              that solve real-world problems. My journey started with a Computer Science degree, and I've been
              continuously learning and adapting to new technologies ever since.
            </p>

            <p className="text-gray-600 leading-relaxed">
              I specialize in modern JavaScript frameworks, cloud architecture, and creating scalable solutions that
              deliver exceptional user experiences. When I'm not coding, you'll find me contributing to open-source
              projects or exploring the latest tech trends.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
