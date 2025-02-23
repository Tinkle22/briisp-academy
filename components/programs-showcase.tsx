'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BsArrowRight } from 'react-icons/bs';
import { 
  SiMysql, 
  SiCisco, 
  SiPython, 
  SiAdobecreativecloud, 
  SiKalilinux, 
  SiReact 
} from 'react-icons/si';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const techSpaceImages = [
  {
    main: "event2.jpg",
    thumbnails: [
      "event2.jpg",
      "event1.jpg",
      "event3.jpg",
      "event4.jpg",
      "event5.jpg"
    ]
  }
];

const adultCourses = [
  {
    name: 'Database Management',
    icon: SiMysql,
    color: 'bg-orange-500',
  },
  {
    name: 'Computer Networking',
    icon: SiCisco,
    color: 'bg-indigo-500',
  },
  {
    name: 'Robotics & Automation',
    icon: SiReact,
    color: 'bg-blue-500',
  },
  {
    name: 'Data Science',
    icon: SiPython,
    color: 'bg-red-500',
  },
  {
    name: 'Graphic Designing',
    icon: SiAdobecreativecloud,
    color: 'bg-pink-500',
  },
  {
    name: 'Cyber Security',
    icon: SiKalilinux,
    color: 'bg-green-500',
  },
  {
    name: 'Web Development',
    icon: SiReact,
    color: 'bg-blue-400',
  },
];

export default function ProgramsShowcase() {
  const [selectedImage, setSelectedImage] = useState<string>(techSpaceImages[0].main);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Original Tech‑Space Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Tech-Space</h2>
          <div className="space-y-4">
            <motion.div 
              className="aspect-video rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setExpanded(true)}
              onMouseEnter={() => setExpanded(true)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={selectedImage}
                alt="Tech Space"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-5 gap-2">
              {techSpaceImages[0].thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(thumb)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === thumb
                      ? 'border-emerald-600'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Full‑Screen Modal with Adult Programs Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          >
            {/* Full‑Screen Tech‑Space Image in the background */}
            <motion.img
              src={selectedImage}
              alt="Tech Space Expanded"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            {/* Overlay with Adult Courses details */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white bg-opacity-90 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Adult Programs (Full-Time)</h3>
                <div className="grid grid-cols-2 gap-3">
                  {adultCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow ${
                        index === adultCourses.length - 1 ? 'col-span-2' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${course.color}`}>
                        <course.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{course.name}</span>
                    </motion.div>
                  ))}
                  <Button
                    className="col-span-2 bg-purple-600 hover:bg-purple-700"
                    asChild
                  >
                    <Link href="/courses">
                      View All Programs
                      <BsArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
            {/* Close Button */}
            <motion.button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow hover:bg-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <span className="text-gray-700 font-bold text-lg">&times;</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}