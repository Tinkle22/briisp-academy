"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <footer className="bg-background border-t py-8">
      <motion.div
        className="max-w-screen-xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Brissp Academy Logo"
              className='w-44 h-14'
            />

            
          </Link>
          <p className="text-sm text-muted-foreground text-center">
            Empowering minds through quality education and professional development.
          </p>
          <div className="flex space-x-4">
            <Link href="/courses" className="text-sm text-muted-foreground hover:text-amber-600">
              Courses
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-amber-600">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-amber-600">
              Contact
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Academy. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}