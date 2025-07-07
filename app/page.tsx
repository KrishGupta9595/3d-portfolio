"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Palette,
  Star,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Instagram,
} from "lucide-react"

import dynamic from "next/dynamic"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { sendEmail } from "./actions/sendEmail"
import Image from "next/image"

// Add this after the imports, before the main component
const Scene3D = dynamic(() => import("./components/Scene3D"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20" />,
})

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  const sections = ["home", "projects", "about", "services", "testimonials", "contact"]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              {"Qubit"}
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors hover:text-blue-400 text-sm lg:text-base ${
                    activeSection === section ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-purple-500/20 pt-4"
              >
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`block w-full text-left py-3 capitalize transition-colors hover:text-blue-400 ${
                      activeSection === section ? "text-blue-400" : "text-gray-300"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
      >
        <div className="absolute inset-0 z-0">
          <ErrorBoundary
            fallback={
              <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative overflow-hidden">
                {/* CSS-only animated background */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-blue-500/30 rotate-45 animate-pulse"></div>
                  <div className="absolute top-3/4 right-1/4 w-8 h-8 border-2 border-purple-500/30 rounded-full animate-bounce"></div>
                  <div className="absolute top-1/2 left-3/4 w-6 h-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rotate-12 animate-spin"></div>
                  <div className="absolute top-1/3 left-1/6 text-blue-400/60 font-mono text-xs sm:text-sm animate-float">
                    {"<code />"}
                  </div>
                  <div className="absolute bottom-1/3 right-1/6 text-purple-400/60 font-mono text-xs sm:text-sm animate-float-delayed">
                    {"{ dev }"}
                  </div>
                </div>
              </div>
            }
          >
            <Scene3D />
          </ErrorBoundary>
        </div>

        <motion.div className="relative z-10 text-center max-w-4xl mx-auto" style={{ y: y1 }}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hi, I'm Krish
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            I design &amp; build modern websites and apps
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Explore My Work
            </Button>
            <Button
              onClick={() => window.open("https://www.instagram.com/qubit.in/", "_blank")}
              variant="outline"
              className="w-full sm:w-auto border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300"
            >
              Let's Connect
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-purple-400 rounded-full flex justify-center"
          >
            <div className="w-1 h-2 sm:h-3 bg-purple-400 rounded-full mt-1 sm:mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              A showcase of my latest work in web and mobile development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                I'm a passionate full-stack developer with 2+ years of experience creating innovative digital solutions.
                I specialize in modern web technologies and love bringing ideas to life through code.
              </p>
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
                sharing knowledge with the developer community.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-300 px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-950">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-6xl sm:text-8xl">👨‍💻</div>
                </div>

                {/* Floating skill icons - hidden on mobile for better performance */}
                {!isMobile && (
                  <>
                    <FloatingIcon icon="⚛️" className="absolute -top-4 -right-4" delay={0} />
                    <FloatingIcon icon="🔥" className="absolute top-1/4 -left-8" delay={0.5} />
                    <FloatingIcon icon="📱" className="absolute -bottom-4 left-1/4" delay={1} />
                    <FloatingIcon icon="🎨" className="absolute top-1/3 -right-8" delay={1.5} />
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Comprehensive development solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-blue-900/20"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              What Clients Say
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Testimonials from satisfied clients and collaborators
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Mail size={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm sm:text-base">Email</p>
                    <p className="text-white text-sm sm:text-base">qubitofficial25@gmail.com</p>
                  </div>
                </div>

                <div className="flex space-x-3 sm:space-x-4 mt-6 sm:mt-8">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon size={16} className="sm:w-5 sm:h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-purple-500/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 Krish. Built with Next.js, Three.js, React 
          </p>
        </div>
      </footer>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Card className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 overflow-hidden h-full">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
        </div>

        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed line-clamp-3">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {project.tags.map((tag: string, tagIndex: number) => (
              <Badge key={tagIndex} className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              size="sm"
              onClick={() => window.open(project.demoUrl, "_blank")}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-xs sm:text-sm"
            >
              <ExternalLink size={14} className="mr-1 sm:mr-2" />
              Live Demo
            </Button>
            
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Service Card Component
function ServiceCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="bg-gradient-to-br from-gray-900/50 to-blue-900/20 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 h-full">
        <CardContent className="p-6 sm:p-8 text-center">
          <motion.div
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <service.icon size={24} className="sm:w-8 sm:h-8 text-white" />
          </motion.div>

          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-400 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{service.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Floating Icon Component
function FloatingIcon({ icon, className, delay }: { icon: string; className: string; delay: number }) {
  return (
    <motion.div
      className={`text-xl sm:text-2xl ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        delay,
      }}
    >
      {icon}
    </motion.div>
  )
}

// Testimonial Carousel Component
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 italic leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>

              <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">{testimonials[currentIndex].name}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevTestimonial}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-500/30 transition-all duration-300"
      >
        <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 hover:bg-purple-500/30 transition-all duration-300"
      >
        <ChevronRight size={16} className="sm:w-5 sm:h-5" />
      </button>

      <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-purple-500" : "bg-purple-500/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const formDataObj = new FormData()
    formDataObj.append("name", formData.name)
    formDataObj.append("email", formData.email)
    formDataObj.append("message", formData.message)

    try {
      const result = await sendEmail(formDataObj)

      if (result.success) {
        setSubmitMessage(result.message)
        setFormData({ name: "", email: "", message: "" })

        // Open mailto link if available
        if (result.mailtoLink) {
          window.open(result.mailtoLink, "_blank")
        }
      } else {
        setSubmitMessage(result.message)
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 border-purple-500/20 backdrop-blur-sm">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 text-sm sm:text-base"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 text-sm sm:text-base"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Textarea
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 resize-none text-sm sm:text-base"
              required
            />
          </motion.div>

          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 sm:p-4 rounded-lg text-center text-sm sm:text-base ${
                submitMessage.includes("successfully")
                  ? "bg-green-500/20 border border-green-500/30 text-green-300"
                  : "bg-red-500/20 border border-red-500/30 text-red-300"
              }`}
            >
              {submitMessage}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}

// Data
const projects = [
  {
    title: "Lending Tracker",
    description:
      "An advanced lending tracker made with react and next.js to record money given to friends and family, with date, time, and smart management features.",
    icon: "🛒",
    image: "/images/ecommerce-demo.png",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    demoUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/username/ecommerce-platform",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, team collaboration, and advanced filtering.",
    icon: "📋",
    image: "/images/task-management-demo.png",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    demoUrl: "https://taskmanager-demo.vercel.app",
    githubUrl: "https://github.com/username/task-manager",
  },
  {
    title: "Fitness Tracking Mobile App",
    description:
      "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.",
    icon: "💪",
    image: "/images/fitness-app-demo.png",
    tags: ["React Native", "Firebase", "Redux", "Charts"],
    demoUrl: "https://fitness-app-demo.vercel.app",
    githubUrl: "https://github.com/username/fitness-tracker",
  },
  {
    title: "AI-Powered Analytics Dashboard",
    description: "Advanced analytics dashboard with AI-driven insights, data visualization, and predictive analytics.",
    icon: "📊",
    image: "/images/analytics-demo.png",
    tags: ["Vue.js", "Python", "TensorFlow", "D3.js"],
    demoUrl: "https://analytics-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/username/analytics-dashboard",
  },
  {
    title: "Real Estate Platform",
    description: "Comprehensive real estate platform with property listings, virtual tours, and mortgage calculator.",
    icon: "🏠",
    image: "/images/real-estate-demo.png",
    tags: ["Angular", "Node.js", "PostgreSQL", "Maps API"],
    demoUrl: "https://realestate-demo.vercel.app",
    githubUrl: "https://github.com/username/real-estate-platform",
  },
  {
    title: "Social Media Dashboard",
    description:
      "Multi-platform social media management tool with scheduling, analytics, and content creation features.",
    icon: "📱",
    image: "/images/social-media-demo.png",
    tags: ["React", "Express", "Redis", "AWS"],
    demoUrl: "https://socialmedia-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/username/social-media-dashboard",
  },
]

const services = [
  {
    title: "Web App Development",
    description:
      "Custom web applications built with modern frameworks like React, Next.js, and Vue.js for optimal performance and user experience.",
    icon: Code,
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications using React Native and Flutter, delivering native performance across iOS and Android.",
    icon: Smartphone,
  },
  {
    title: "UI/UX & 3D Prototyping",
    description:
      "Beautiful, intuitive user interfaces with 3D elements and interactive prototypes that engage and delight users.",
    icon: Palette,
  },
]

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Flutter",
  "React Native",
  "Three.js",
  "Framer Motion",
  "Tailwind CSS",
  "Firebase",
  "PostgreSQL",
  "AWS",
  "Docker",
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content:
      "Krish delivered an exceptional web application that exceeded our expectations. The 3D elements and smooth animations really set our product apart from competitors.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager, InnovateCorp",
    content:
      "Working with Krish was a pleasure. His attention to detail and ability to translate complex requirements into elegant solutions is remarkable.",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, DesignStudio",
    content:
      "The mobile app Krish developed for us has received outstanding user feedback. The performance and user experience are top-notch.",
  },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/username" },
  { icon: Linkedin, href: "https://linkedin.com/in/username" },
  { icon: Instagram, href: "https://www.instagram.com/qubit.in/" },
]
