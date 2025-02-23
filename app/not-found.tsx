'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
      
            <span className="text-2xl font-bold">Briisp Academy</span>
          </div>
        </div>

        {/* 404 Text */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-amber-600">Stay Tuned</h1>
          <h2 className="text-3xl font-semibold">Page Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for is in development. 
            Let's get you back on track!
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            asChild
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button 
            className="w-full bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
            asChild
          >
            <Link href="/courses">
              <Search className="h-4 w-4" />
              Search Courses
            </Link>
          </Button>
        </div>

        {/* Popular Links */}
        <div className="pt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Popular Destinations
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: 'Adult Programs', href: '/admissions/adults' },
              { name: 'Kids Programs', href: '/admissions/kids' },
              { name: 'Computer Science', href: '/depts/computer-science' },
              { name: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-amber-600 transition-colors px-3 py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-600 transition-colors mt-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}