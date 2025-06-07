import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCircle,
  PhoneCall,
  FileStack,
  Printer,
  MapPin,
} from 'lucide-react';
import Logo from './logo';
import useMediaQuery from '../hooks/MediaQuery';


// Animation variants
const fadeSlide = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } },
};

const NavBar = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)'); // md breakpoint

  const navItems = [
    { to: '/about', label: 'About', Icon: UserCircle },
    { to: '/contact', label: 'Contact', Icon: PhoneCall },
    { to: '/portfolio', label: 'Our Work', Icon: FileStack },
    { to: '/services', label: 'Services', Icon: Printer },
    { to: '/location', label: 'Find Us', Icon: MapPin },
  ];

  return (
    <nav className="fixed w-full h-15 py-4  border-b-2 border-inactive ">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center text-head 
        text-sm md:text-base font-medium space-x-7 sm:space-x-6 md:space-x-10 lg:space-x-14 xl:space-x-20">

        {/* Logo with entrance animation */}
        <motion.div
          className="hidden md:inline w-9"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
        </motion.div>

        {navItems.map(({ to, label, Icon }, index) => (
          <div key={to} className="flex items-center space-x-1">
            <Link to={to} className="hover:text-high transition duration-200 flex items-center space-x-1">

              {/* Animate text if on desktop */}
              <AnimatePresence mode="wait">
                {isDesktop && (
                  <motion.span
                    key="text"
                    variants={fadeSlide}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="hidden md:inline"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Animate icon if on mobile */}
              <AnimatePresence mode="wait">
                {!isDesktop && (
                  <motion.div
                    key="icon"
                    variants={fadeSlide}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="md:hidden"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
{/* 
            Separator for desktop
            <AnimatePresence mode="wait">
              {isDesktop && index !== navItems.length - 1 && (
                <motion.span
                  key={`sep-${index}`}
                  className="hidden md:inline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  
                </motion.span>
              )}
            </AnimatePresence> */}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
