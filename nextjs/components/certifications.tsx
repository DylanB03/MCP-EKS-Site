import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Certifications() {
  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-SAA-2023-001",
      description: "Demonstrates expertise in designing distributed systems on AWS.",
      verifyUrl: "https://aws.amazon.com/verification",
    },
    {
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2022",
      credentialId: "GCP-PD-2022-001",
      description: "Validates skills in developing scalable applications on Google Cloud Platform.",
      verifyUrl: "https://cloud.google.com/certification",
    },
    {
      title: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2022",
      credentialId: "CKA-2022-001",
      description: "Demonstrates skills in Kubernetes cluster administration and troubleshooting.",
      verifyUrl: "https://www.cncf.io/certification",
    },
    {
      title: "MongoDB Certified Developer",
      issuer: "MongoDB Inc.",
      date: "2021",
      credentialId: "MDB-DEV-2021-001",
      description: "Validates proficiency in MongoDB database development and optimization.",
      verifyUrl: "https://university.mongodb.com/certification",
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
