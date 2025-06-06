import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// NavLinkItem renders a single nav link with active styles and animation
const NavLinkItem = ({ path, label, onClick, isActive }) => (
  <li key={path} className="relative group w-full">
    <Link
      to={path}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`block px-4 py-2 text-center rounded transition-all duration-200 cursor-pointer 
        ${isActive ? "bg-bone text-cloud" : "hover:text-cloud"}`}
    >
      {label}
    </Link>

    {/* Animated background hover effect */}
    <span className="absolute inset-0 bg-bone opacity-0 group-hover:opacity-0 transform scale-x-0 group-hover:scale-x-100 transition-all duration-200 ease-in-out z-[-1]"></span>
  </li>
);

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/About", label: "About" },
    { path: "/Contact", label: "Contact" },
    { path: "/Blog", label: "Blog" },
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <motion.nav layout className="w-full text-bone py-4 px-5 z-50">
      <div className="flex items-center justify-between md:justify-center">
        {/* Hamburger toggle */}
        <motion.button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            key={isOpen ? "close" : "menu"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? "✕" : "☰"}
          </motion.span>
        </motion.button>
      </div>

      {/* Mobile dropdown menu */}
      <motion.div layout>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.ul
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="flex flex-col items-center gap-4 mt-4 text-sm font-bold 
                uppercase tracking-wide md:hidden overflow-hidden"
            >
              {navItems.map(({ path, label }) => (
                <NavLinkItem
                  key={path}
                  path={path}
                  label={label}
                  onClick={() => setIsOpen(false)}
                  isActive={location.pathname === path}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Desktop menu */}
      <ul className="hidden md:flex justify-center gap-6 mt-4 text-sm font-bold uppercase tracking-wide">
        {navItems.map(({ path, label }) => (
          <NavLinkItem
            key={path}
            path={path}
            label={label}
            isActive={location.pathname === path}
          />
        ))}
      </ul>
    </motion.nav>
  );
};

export default NavBar;
