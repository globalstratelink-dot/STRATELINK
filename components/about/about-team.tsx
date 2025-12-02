"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from 'lucide-react'
import Image from "next/image"

export function AboutTeam() {
  const team = [
    {
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      bio: "15+ years of strategic consulting experience with Fortune 500 companies.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
      email: "sarah.globalstratelink@gmail.com",
      avatarFallback: "SJ"
    },
    {
      name: "Michael Chen",
      position: "Chief Strategy Officer",
      bio: "Expert in digital transformation and global market expansion strategies.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
      email: "michael.globalstratelink@gmail.com",
      avatarFallback: "MC"
    },
    {
      name: "Elena Rodriguez",
      position: "Head of Operations",
      bio: "Specializes in operational excellence and performance optimization.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
      email: "elena.globalstratelink@gmail.com",
      avatarFallback: "ER"
    },
    {
      name: "David Kim",
      position: "Chief Technology Officer",
      bio: "Leading digital innovation and technology integration initiatives.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
      email: "david.globalstratelink@gmail.com",
      avatarFallback: "DK"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-navy to-navy/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Meet Our Leadership Team</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experienced professionals dedicated to your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-500 transform hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-full h-full rounded-full border-2 border-copper/30 group-hover:border-copper transition-colors duration-300 overflow-hidden bg-copper/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-full h-full flex items-center justify-center text-copper font-bold text-lg"
                      style={{ display: 'none' }}
                    >
                      {member.avatarFallback}
                    </div>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-copper transition-colors duration-300">
                  {member.name}
                </h3>
                <div className="text-copper text-sm font-medium mb-3">{member.position}</div>
                <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-3">
                  <a href={member.linkedin} className="text-gray-400 hover:text-copper transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-copper transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
