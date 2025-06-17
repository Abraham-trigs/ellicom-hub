import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Clock,
  MessageCircle,
  CreditCard,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import Logo from './logo';

const navItems = [
  { label: 'Recent Jobs', Icon: Printer },
  { label: 'History', Icon: Clock },
  { label: 'Message', Icon: MessageCircle },
  { label: 'Transactions', Icon: CreditCard },
  { label: 'Notification', Icon: Bell },
  { label: 'Settings', Icon: Settings },
];

const SideNav = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.nav
            className="fixed top-0 right-0 bottom-0 w-60 bg-white dark:bg-container shadow-xl z-50 flex flex-col p-6 rounded-l-4xl border-2 border-sea"
            initial={{ x: '100%' }}
            animate={{ x: 2 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded hover:bg-inactive transition self-end"
            >
              <X className="w-6 h-6 text-gold hover:text-container " />
            </button>

            <div className="flex flex-col flex-grow justify-center items-center -mt-10 text-center">
              <div className="scale-75">
                <Logo />
              </div>

              <div className="mb-4 -mt-3 text-x font-semibold text-head ">
                Thomas Muller
              </div>

              <div className="mb-6">
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="bg-sea p-2 px-7 py-1 text-ground rounded-lg font-normal text 
                    text-center
                    transition ease-in-out duration-200 hover:bg-high hover:scale-95"
                  >
                    New Job <span className=" p-0 font-black">+</span>{' '}
                  </button>
                </div>
              </div>

              {/* Nav items */}
              <ul className="w-full flex flex-col justify-center items-center ">
                {navItems.map(({ label, Icon }, index) => (
                  <React.Fragment key={label}>
                    <li>
                      <button
                        className="w-full flex items-center gap-3 gap-y-10 py-1 px-3 m-2 text-head 
                       hover:bg-gold hover:bg-full hover:text-container hover:text-[1.1rem] 
                        hover:font-semibold rounded transition"
                        onClick={() => console.log(`${label} clicked`)}
                      >
                        <Icon className="w-5 h-5" />
                        {label}
                      </button>
                    </li>
                    {/* Divider between nav items except last */}
                    {index !== navItems.length - 1 && (
                      <hr className="border-gold w-full my-1" />
                    )}
                  </React.Fragment>
                ))}
              </ul>

              {/* Logout button */}
              <div className="w-full mt-6">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
                  onClick={() => console.log('Logout clicked')}
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Hamburger toggle */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
      >
        {!isOpen ? (
          <>
            <span className="block w-7 h-0.5 bg-gray-800 dark:bg-gray-200 rounded" />
            <span className="block w-7 h-0.5 bg-gray-800 dark:bg-gray-200 rounded" />
            <span className="block w-7 h-0.5 bg-gray-800 dark:bg-gray-200 rounded" />
          </>
        ) : (
          <X className="w-7 h-7 text-gray-800 dark:text-gray-200" />
        )}
      </button>

      {/* Sidebar drawer */}
      <SideNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SideBar;
