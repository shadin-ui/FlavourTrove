import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import RecipeSearch from '../components/RecipeSearch';
import Testimonials from '../components/Testimonials';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Home() {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <About />
      <RecipeSearch />
      <Testimonials />
    </motion.main>
  );
}
