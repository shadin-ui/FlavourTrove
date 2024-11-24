import { Link, useLocation } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 via-orange-600 to-orange-700 dark:from-amber-400 dark:via-orange-500 dark:to-orange-600 bg-clip-text text-transparent">
              FlavourTrove
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-base transition-colors ${
                  location.pathname === path
                    ? 'text-orange-600 dark:text-orange-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex items-center space-x-6">
              <div className="border-l border-gray-200 dark:border-gray-700 pl-6">
                <ThemeSwitch />
              </div>
              <Link
                to="/search"
                className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-white bg-orange-600 hover:bg-orange-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Theme Switch & Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeSwitch />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`block py-2 text-base ${
                    location.pathname === path
                      ? 'text-orange-600 dark:text-orange-400 font-medium'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/search"
                className="block w-full mt-6 px-4 py-3 rounded-lg font-medium text-center text-white bg-orange-600 hover:bg-orange-500 transition-all duration-200 shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
