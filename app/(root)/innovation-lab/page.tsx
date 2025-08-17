/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Cpu,
  Lightbulb,
  Rocket,
  Trophy,
  DollarSign,
  Users,
  ArrowRight,
  CheckCircle,
  BookOpen,
  CalendarCheck,
  Zap,
  Target,
  Star,
  Code,
  Wrench,
  Brain,
  Globe,
  Award,
  Beaker,
  Settings,
  TrendingUp,
} from 'lucide-react';

const stats = [
  { icon: Rocket, label: 'Projects Launched', value: '150+', color: 'text-blue-600' },
  { icon: Trophy, label: 'Competition Wins', value: '75%', color: 'text-purple-600' },
  { icon: DollarSign, label: 'Grants Secured', value: '$2M+', color: 'text-green-600' },
  { icon: Users, label: 'Active Innovators', value: '500+', color: 'text-orange-600' },
];

const services = [
  {
    icon: Code,
    title: 'Prototype Development',
    description: 'Build working prototypes for software and hardware innovations with expert guidance.',
  },
  {
    icon: Brain,
    title: 'Innovation Incubation',
    description: 'Structured programs to nurture your ideas from concept to market-ready solutions.',
  },
  {
    icon: Trophy,
    title: 'Competition Preparation',
    description: 'Get ready for tech competitions, hackathons, and innovation challenges.',
  },
  {
    icon: DollarSign,
    title: 'Grant Application Support',
    description: 'Expert assistance in securing funding through grants and innovation programs.',
  },
  {
    icon: Cpu,
    title: 'AI/IoT Development Labs',
    description: 'Access cutting-edge labs for artificial intelligence and Internet of Things projects.',
  },
];

const audience = [
  {
    icon: Lightbulb,
    title: 'Student Innovators',
    description: 'Students with breakthrough ideas ready to change the world.',
  },
  {
    icon: Rocket,
    title: 'Tech Entrepreneurs',
    description: 'Entrepreneurs building the next generation of technology solutions.',
  },
  {
    icon: Beaker,
    title: 'Research Teams',
    description: 'Academic and industry researchers developing innovative technologies.',
  },
];

const process = [
  {
    step: '1',
    title: 'Idea Assessment',
    description: 'Evaluate your innovation potential and market viability.',
    icon: Lightbulb,
  },
  {
    step: '2',
    title: 'Lab Access',
    description: 'Get access to state-of-the-art development facilities.',
    icon: Settings,
  },
  {
    step: '3',
    title: 'Prototype Building',
    description: 'Develop working prototypes with expert mentorship.',
    icon: Wrench,
  },
  {
    step: '4',
    title: 'Testing & Iteration',
    description: 'Test, refine, and improve your innovation.',
    icon: Target,
  },
  {
    step: '5',
    title: 'Launch & Scale',
    description: 'Bring your innovation to market or competition.',
    icon: TrendingUp,
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

export default function InnovationLabPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-indigo-950/50 overflow-hidden">
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
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-4">
                  <Cpu className="h-8 w-8 text-blue-600" />
                </div>
                <span className="text-blue-600 font-semibold text-lg">Innovation Hub</span>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-gray-100 dark:to-blue-400 bg-clip-text text-transparent">
                Innovation & Technology Lab
              </h1>
              <p className="text-xl leading-8 text-muted-foreground mb-6">
                Empower your innovation to compete globally and solve real problems. Access cutting-edge labs, expert mentorship, and resources to turn your ideas into reality.
              </p>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 p-4 rounded-lg mb-8">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  "Got an idea? Let's make it real."
                </p>
              </div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link href="/apply/innovation-lab">
                  <Button size="lg" className="bg-blue-600 hover:bg-purple-700 shadow-lg">
                    Join the Lab
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
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                    alt="Innovation lab with technology"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Rocket className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Projects Launched</p>
                      <p className="text-xl font-bold text-blue-600">150+</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Success Rate</p>
                      <p className="text-xl font-bold text-purple-600">75%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
                  <CardContent className="p-6">
                    <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Innovation Lab Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From idea to implementation, we provide comprehensive support for your innovation journey
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md dark:bg-gray-700">
                  <CardHeader>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full w-fit mb-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our innovation lab is designed for forward-thinking individuals and teams
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
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
                  <CardHeader>
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full w-fit mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Innovation Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven 5-step process to transform your ideas into market-ready innovations
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {process.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="relative">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg w-fit mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
              Ready to Innovate?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join our innovation lab and turn your breakthrough ideas into reality. Get access to cutting-edge technology, expert mentorship, and a community of innovators.
            </p>
            <Link href="/apply/innovation-lab">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                Apply to Join the Lab
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
