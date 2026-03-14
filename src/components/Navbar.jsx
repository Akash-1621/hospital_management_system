import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Menu, X } from "lucide-react";

import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Teams", href: "/team" },
    { name: "Contact", href: "/contact" },
    { name: "Help", href: "/help" },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-3" : "py-5"}`}
    >
      <div className="container-custom">
        <div
          className={`px-6 py-3 flex items-center justify-between rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "bg-white/80 backdrop-blur-2xl border border-slate-200/60 shadow-lg shadow-slate-200/40"
              : "bg-white/40 backdrop-blur-sm"
          }`}
        >
          {/* Logo */}
          <a href="/" onClick={(e) => handleClick(e, "/")} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
              <Activity className="w-5 h-5" style={{color: 'white'}} />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <span className="text-xl font-outfit font-bold tracking-tight">
              <span className="text-slate-800">Care</span>
              <span className="text-gradient">Sphere</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            
            {user ? (
               <div className="flex items-center gap-6">
                  {/* Subtle Profile indicator */}
                  <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-slate-600 hidden lg:block">{user.name.split(' ')[0]}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                          const path = user.role === 'Doctor' ? '/doctor-dashboard' : 
                                      user.role === 'Receptionist' ? '/receptionist-dashboard' : 
                                      '/patient-dashboard';
                          navigate(path);
                      }}
                      className="text-xs font-bold text-slate-600 hover:text-cyan-600 transition-colors uppercase tracking-widest"
                    >
                      Dashboard
                    </button>

                    <button 
                      onClick={() => { logout(); navigate('/'); }}
                      className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                    >
                      Logout
                    </button>
                  </div>
               </div>
            ) : (
                <button
                onClick={() => navigate('/login')}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 transition-all active:scale-[0.98]"
              >
                Login
              </button>
            )}
           
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="md:hidden mt-3 glass-card p-6 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-700 hover:text-slate-900 transition-colors py-2"
                  onClick={(e) => handleClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
