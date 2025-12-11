import React, { useState } from 'react';
import { Menu, X, Heart, Home, Users } from 'lucide-react';
import { api } from '../utils/api';

const Navbar = ({ currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(() => api.getCurrentUserFromStorage());
  const isAuthenticated = api.isAuthenticated();

  const links = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Home-Nursing', href: '/home-nursing', icon: <Heart size={18} /> },
    { name: 'Adoption', href: '/adoption', icon: <Users size={18} /> },
    { name: 'Companionship', href: '/companionship', icon: <Users size={18} /> },
  ];
  
  const handleLogout = () => {
    api.logout();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">CARETAKERS</span>
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  currentPage === link.name
                    ? 'text-white bg-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.name}
              </a>
            ))}
            <div className="ml-4 flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-4 py-2 text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="ml-3 px-4 py-2 text-sm font-medium rounded-md text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  currentPage === link.name
                    ? 'text-white bg-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-gray-700">
                    Welcome, {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-secondary hover:bg-secondary-dark transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <a
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-secondary hover:bg-secondary-dark transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="block px-3 py-2 mt-1 rounded-md text-base font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;