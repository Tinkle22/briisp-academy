/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  BarChart2,
  Users,
  DollarSign,
  Lightbulb,
  Presentation,
  UserCheck,
  Award,
  ArrowRight,
  CheckCircle,
  BookOpen,
  CalendarCheck,
  Rocket,
  Handshake,
  Star,
  Target,
} from 'lucide-react';

const stats = [
  { icon: Presentation, label: 'Successful Pitches', value: '200+', color: 'text-amber-600' },
  { icon: Star, label: 'Funding Success Rate', value: '85%', color: 'text-orange-600' },
  { icon: Handshake, label: 'Investor Connections', value: '50+', color: 'text-green-600' },
  { icon: UserCheck, label: '24/7 Mentorship', value: 'Yes', color: 'text-blue-600' },
];

const services = [
  {
    icon: FileText,
    title: 'Pitch Deck Writing',
    description: 'Craft compelling decks covering Problem, Solution, Traction, and more.',
  },
  {
    icon: BarChart2,
    title: 'Financial Projections',
    description: 'Build credible, investor-ready financial models and forecasts.',
  },
  {
    icon: Lightbulb,
    title: 'Investor Mindset Training',
    description: 'Understand what investors look for and how to speak their language.',
  },
  {
    icon: Presentation,
    title: 'Mock Pitching Sessions',
    description: 'Practice your pitch with feedback from experts and peers.',
  },
  {
    icon: CalendarCheck,
    title: 'Demo Day Preparation',
    description: 'Get ready for real investor meetings and demo days.',
  },
];

const audience = [
  {
    icon: Rocket,
    title: 'Early-Stage Startups',
    description: 'Founders looking to raise their first round or refine their pitch.',
  },
  {
    icon: BookOpen,
    title: 'Student Entrepreneurs',
    description: 'Students with innovative ideas seeking funding or grants.',
  },
  {
    icon: Award,
    title: 'Innovators & Grant Seekers',
    description: 'Anyone aiming to win grants or startup competitions.',
  },
];

const process = [
  {
    step: '1',
    title: 'Discovery',
    description: 'Share your idea and goals with our team.',
    icon: Lightbulb,
  },
  {
    step: '2',
    title: 'Deck Creation',
    description: 'We help you build a standout pitch deck.',
    icon: FileText,
  },
  {
    step: '3',
    title: 'Financials',
    description: 'Develop robust financial projections.',
    icon: BarChart2,
  },
  {
    step: '4',
    title: 'Pitch Practice',
    description: 'Refine your delivery with mock sessions.',
    icon: Presentation,
  },
  {
    step: '5',
    title: 'Demo Day',
    description: 'Present to real investors or grant panels.',
    icon: CalendarCheck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function PitchDeckStartupFundingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/50 dark:via-orange-950/50 dark:to-yellow-950/50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full mr-4">
                  <Presentation className="h-8 w-8 text-amber-600" />
                </div>
                <span className="text-amber-600 font-semibold text-lg">Startup Success</span>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-gray-900 to-orange-600 dark:from-gray-100 dark:to-orange-400 bg-clip-text text-transparent">
                Pitch Deck & Startup Funding Help
              </h1>
              <p className="text-xl leading-8 text-muted-foreground mb-8">
                Learn to pitch like a pro. We help startups, students, and entrepreneurs craft winning decks, master financials, and connect with real investors.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link href="/apply/pitch-deck">
                  <Button size="lg" className="bg-amber-600 hover:bg-orange-700 shadow-lg">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
          
              </motion.div>
            </motion.div>
            {/* Right Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                    alt="Pitching to investors"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {/* Floating Cards */}
                <motion.div
                  className="absolute -top-6 -left-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border dark:border-gray-700"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">200+ Pitches</p>
                      <p className="text-xs text-muted-foreground">Decks Created</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border dark:border-gray-700"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Handshake className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">50+ Investors</p>
                      <p className="text-xs text-muted-foreground">Connections Made</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Enhanced background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-xl"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-20 blur-xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full opacity-20 blur-xl"
            animate={{
              rotate: [0, -180, -360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-muted rounded-full">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What's Included
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to pitch with confidence and secure funding.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                      <service.icon className="h-7 w-7 text-amber-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-6">
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Target Audience Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/50 dark:via-amber-950/50 dark:to-yellow-950/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Who It's For
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Designed for founders, students, and innovators ready to take their ideas to the next level.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {audience.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                      <item.icon className="h-7 w-7 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-6">
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Process Flow Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-3xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Your Pitch Journey</h3>
              <p className="text-muted-foreground">From idea to investor-ready – we guide you every step</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative mb-4 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-center shadow-lg mb-2">
                      <item.icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section id="apply" className="py-20 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 dark:from-amber-900/50 dark:via-orange-900/50 dark:to-yellow-900/50">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to pitch and raise funding?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Apply now to get expert help with your pitch deck, financials, and investor connections.
            </p>
            <Link href="/apply/pitch-deck">
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg text-lg py-6">
                APPLY NOW
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}