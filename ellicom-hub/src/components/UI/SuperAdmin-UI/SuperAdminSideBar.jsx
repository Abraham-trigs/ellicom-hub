import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Users,
  BarChart2,
  ClipboardList,
  PackageCheck,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Award,
  LineChart,
  LayoutDashboard
} from 'lucide-react';
import Logo from './logo';

const navItems = [
  { label: 'Dashboard', Icon: LayoutDashboard },
  { label: 'Staff Management', Icon: Users },
  { label: 'Top Performer', Icon: Award },
  { label: 'Job Queue', Icon: ClipboardList },
  { label: 'Inventory', Icon: PackageCheck },
  { label: 'Transactions', Icon: DollarSign },
  { label: 'Analytics', Icon: LineChart },
  { label: 'Notifications', Icon: Bell },
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

          {/* SuperAdmin SideBar */}
          <motion.nav
            className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-container shadow-xl z-50 flex flex-col p-6 rounded-l-4xl border-2 border-sea"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded hover:bg-inactive transition self-end"
            >
              <X className="w-6 h-6 text-gold hover:text-container" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center -mt-10 text-center">
              <div className="scale-75">
                <Logo />
              </div>
              <div className="mb-4 -mt-3 text-xl font-semibold text-head">
                Super Admin
              </div>
              <div className="mb-6">
                <button
                  className="bg-sea px-7 py-2 text-ground rounded-lg font-normal text-center 
                  transition ease-in-out duration-200 hover:bg-high hover:scale-95"
                >
                  New Job <span className="font-black">+</span>
                </button>
              </div>
            </div>

            {/* Navigation items */}
            <ul className="w-full flex flex-col items-center">
              {navItems.map(({ label, Icon }, index) => (
                <React.Fragment key={label}>
                  <li>
                    <button
                      className="w-full flex items-center gap-3 py-2 px-3 m-1 text-head 
                      hover:bg-gold hover:text-container hover:font-semibold rounded transition"
                      onClick={() => console.log(`${label} clicked`)}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </button>
                  </li>
                  {index !== navItems.length - 1 && (
                    <hr className="border-gold w-full my-1" />
                  )}
                </React.Fragment>
              ))}
            </ul>

            {/* Logout */}
            <div className="w-full mt-auto pt-6">
              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
                onClick={() => console.log('Logout clicked')}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

const SuperAdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Hamburger Toggle */}
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

      {/* Sidebar */}
      <SideNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SuperAdminSidebar;


