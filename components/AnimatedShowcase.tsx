"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BsArrowRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { 
  SiMysql, 
  SiCisco, 
  SiPython, 
  SiAdobecreativecloud, 
  SiKalilinux, 
  SiReact 
} from 'react-icons/si';

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

const academyReasons = [
  {
    title: "Innovative Curriculum",
    description: "Our curriculum is continually updated to reflect the latest industry trends and technologies.",
    icon: SiReact,
    color: "bg-blue-500",
  },
  {
    title: "Expert Faculty",
    description: "Learn from experienced professionals dedicated to your success and growth.",
    icon: SiMysql,
    color: "bg-orange-500",
  },
  {
    title: "State-of-the-Art Facilities",
    description: "Experience hands-on learning in our modern labs and cutting-edge classrooms.",
    icon: SiCisco,
    color: "bg-indigo-500",
  },
  {
    title: "Global Opportunities",
    description: "Expand your horizons with international exchange programs and global networks.",
    icon: SiPython,
    color: "bg-red-500",
  },
  {
    title: "Career Support",
    description: "We offer comprehensive career guidance, internships, and job placement assistance.",
    icon: SiKalilinux,
    color: "bg-green-500",
  },
];

export default function AnimatedShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const images = techSpaceImages[0].thumbnails;

  useEffect(() => {
    if (!expanded) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [expanded, images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const selectedReason = academyReasons[currentIndex];

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl">
          {/* Main Carousel */}
          <div className="relative h-96">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                className="absolute w-full h-full"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              >
                <motion.div
                  className="w-full h-full cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                  onClick={() => setExpanded(true)}
                >
                  <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">
                      {selectedReason.title}
                    </h3>
                    <p className='text-amber-600'>Click for more</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {/* <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10"
            >
              <BsChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10"
            >
              <BsChevronRight className="w-6 h-6" />
            </button> */}

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-amber-600 w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              className="relative bg-background rounded-lg shadow-xl overflow-hidden max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={images[currentIndex]}
                alt="Tech Space Expanded"
                className="w-full h-48 object-cover"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`p-2 rounded-lg ${selectedReason.color}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <selectedReason.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-bold"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Why Choose Brissp Academy?
                  </motion.h3>
                </div>
                <motion.h4
                  className="text-xl font-semibold mt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {selectedReason.title}
                </motion.h4>
                <motion.p
                  className="mt-2 text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {selectedReason.description}
                </motion.p>
              </div>
              <motion.button
                onClick={() => setExpanded(false)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:bg-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <span className="text-gray-700 font-bold text-lg">&times;</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}