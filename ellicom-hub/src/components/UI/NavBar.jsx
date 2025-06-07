import { Link } from 'react-router-dom';
import {
  UserCircle,
  PhoneCall,
  FileStack,
  Printer,
  MapPin,
} from 'lucide-react';
import Logo from './logo';

const NavBar = () => {
  return (
    <nav className="fixed w-full py-4 border-b-2 border-inactive">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center text-head 
      text-sm md:text-base font-medium space-x-7 sm:space-x-6 md:space-x-10 lg:space-x-14 xl:space-x-20 m:space-20">

        {/* Logo only on desktop */}
        <div className="hidden md:inline w-9">
          <Logo />
        </div>

        {/* Nav Items */}
        <Link to="/about" className="hover:text-high transition duration-200 flex items-center">
          <span className="md:inline hidden">About</span>
          <UserCircle className="md:hidden w-5 h-5" />
        </Link>

        <span className="text-head hidden md:inline">|</span>

        <Link to="/contact" className="hover:text-high transition duration-200 flex items-center">
          <span className="md:inline hidden">Contact</span>
          <PhoneCall className="md:hidden w-5 h-5" />
        </Link>

        <span className="text-head hidden md:inline">|</span>

        <Link to="/portfolio" className="hover:text-high transition duration-200 flex items-center">
          <span className="md:inline hidden">Our Work</span>
          <FileStack className="md:hidden w-5 h-5" />
        </Link>

        <span className="text-head hidden md:inline">|</span>

        <Link to="/services" className="hover:text-high transition duration-200 flex items-center">
          <span className="md:inline hidden">Services</span>
          <Printer className="md:hidden w-5 h-5" />
        </Link>

        <span className="text-head hidden md:inline">|</span>

        <Link to="/location" className="hover:text-high transition duration-200 flex items-center">
          <span className="md:inline hidden">Find Us</span>
          <MapPin className="md:hidden w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
