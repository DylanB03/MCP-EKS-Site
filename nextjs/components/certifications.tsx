import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Certifications() {
  const certifications = [
    {
      title: "AWS Cloud Technical Essentials",
      issuer: "Coursera",
      date: "2025",
      credentialId: "WFXL5QK544WA",
      description: "Demonstrates knowledge of AWS products, services, and solutions, such as EC2, Lambda, EKS, S3, Bedrock.",
      verifyUrl: "https://www.coursera.org/account/accomplishments/certificate/WFXL5QK544WA",
    },
  ]

  return (
    <section id="certifications" className="py-20 bg-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional certifications that validate my expertise in various technologies and platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900">{cert.title}</CardTitle>
                    <p className="text-blue-600 font-semibold">{cert.issuer}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary">{cert.date}</Badge>
                      <span className="text-sm text-gray-500">ID: {cert.credentialId}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{cert.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Verify Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
