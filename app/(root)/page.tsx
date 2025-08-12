/* eslint-disable react/no-unescaped-entities */
"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Trophy,
  ArrowRight,
  Download,
  MapPin,
  Bell,
  GraduationCap,
  Award,
  Globe,
  Lightbulb,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProgramsShowcase from "@/components/programs-showcase";
import NoticeBoard from "@/components/notice-board";
import KidsPrograms from "@/components/kids-programs";
import AnimatedShowcase from "@/components/AnimatedShowcase";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DownloadableFile {
  file_name: string;
  file_url: string;
}

export default function Home() {
  const [downloadables, setDownloadables] = useState<DownloadableFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloadables = async () => {
      try {
        const response = await fetch('/api/downloadables');
        if (!response.ok) throw new Error('Failed to fetch downloadables');
        const data = await response.json();
        // Ensure data is an array before setting state
        setDownloadables(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching downloadables:', error);
        setDownloadables([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloadables();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] sm:h-[80vh] overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          >
            <source
              src="b.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background"></div>
        </div>
      </motion.section>

      {/* Highlights Carousel Section */}
      <motion.section
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          delay: 0.3, 
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="relative py-16 bg-gradient-to-b from-background to-muted/30"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Excellence in Education
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover what makes our academy the premier choice for quality education and career development
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-amber-200 dark:border-amber-800 hover:shadow-xl hover:shadow-amber-500/20 dark:hover:shadow-amber-900/30 hover:-translate-y-2 hover:scale-105 transition-all duration-500 ease-out group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
                      <GraduationCap className="h-8 w-8 text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300">Expert Faculty</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Learn from industry professionals with years of real-world experience and academic excellence.
                    </p>
                  </div>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 border-emerald-200 dark:border-emerald-800 hover:shadow-xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-900/30 hover:-translate-y-2 hover:scale-105 transition-all duration-500 ease-out group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
                      <Award className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">Accredited Programs</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      All our courses are internationally recognized and accredited by leading educational bodies.
                    </p>
                  </div>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-900/30 hover:-translate-y-2 hover:scale-105 transition-all duration-500 ease-out group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
                      <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">Global Network</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Connect with students and professionals worldwide through our extensive alumni network.
                    </p>
                  </div>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 border-purple-200 dark:border-purple-800 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-900/30 hover:-translate-y-2 hover:scale-105 transition-all duration-500 ease-out group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
                      <Lightbulb className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">Innovation Hub</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Access cutting-edge technology and innovation labs to bring your ideas to life.
                    </p>
                  </div>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/50 dark:to-pink-950/50 border-rose-200 dark:border-rose-800 hover:shadow-xl hover:shadow-rose-500/20 dark:hover:shadow-rose-900/30 hover:-translate-y-2 hover:scale-105 transition-all duration-500 ease-out group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-rose-100 dark:bg-rose-900/50 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
                      <Users className="h-8 w-8 text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors duration-300">Career Support</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Comprehensive career guidance and job placement assistance to ensure your success.
                    </p>
                  </div>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/50 dark:to-cyan-950/50 border-teal-200 dark:border-teal-800 hover:shadow-xl hover:shadow-teal-500/20 dark:hover:shadow-teal-900/30 hover:-translate-y-2 hover:scale-105 transition-all duration-500 ease-out group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
                      <Trophy className="h-8 w-8 text-teal-600 dark:text-teal-400 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-300">Excellence Awards</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Recognized for outstanding educational quality and student achievement across multiple disciplines.
                    </p>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </motion.section>

      {/* Programs Showcase & Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-6 lg:px-8 py-8"
      >
        {/* Main Content */}
        <div className="flex-1">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="py-20"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose Our Academy?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We provide comprehensive education solutions designed to help
                you succeed in today's competitive world.
              </p>
            </div>
            <div className="mx-auto mt-16">
              <AnimatedShowcase />
            </div>
          </motion.section>
        </div>
        {/* Side Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="lg:w-80 space-y-8"
        >
          {/* Notice Board */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-amber-600" />
              <h2 className="text-xl font-semibold">Notice Board</h2>
            </div>
            <NoticeBoard />
          </Card>
          {/* Downloads */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Download className="h-5 w-5 text-amber-600" />
              <h2 className="text-xl font-semibold">Downloads</h2>
            </div>
            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading downloads...</p>
              ) : downloadables.length > 0 ? (
                downloadables
                  .filter(file => 
                    ["Academy Brochure", "Course Catalog", "Fee Structure"].includes(file.file_name)
                  )
                  .map((file, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-between text-left font-normal transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                      onClick={() => window.open(file.file_url, "_blank")}
                    >
                      <span>{file.file_name}</span>
                    </Button>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground">No downloadable files available</p>
              )}
            </div>
          </Card>
          {/* Campus Location */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-amber-600" />
              <h2 className="text-xl font-semibold">Campus Location</h2>
            </div>
            <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
              <img
                src="img-01.jpg"
                alt="Campus"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Main Campus</p>
              <p className="text-muted-foreground">Meanwood Ndeke Phase 2</p>
              <p className="text-muted-foreground">Plot 2436 Lusaka</p>
              <p className="text-amber-600">+260 953500666</p>
              <p className="text-amber-600">
                briispacademyacademy111@gmail.com
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Kids Programs Section */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <KidsPrograms />
      </motion.div> */}

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative isolate py-20 sm:py-32 bg-muted mt-auto"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join thousands of students who have already transformed their
              careers through our academy.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <Button
                className="bg-amber-600 hover:bg-amber-700 group"
                size="lg"
                asChild
              >
                <Link href="/courses">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
