import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Github, Linkedin, Twitter, Instagram, Heart, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        {/* Top CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-800">
            Ready to <span className="text-gradient">Transform</span> Your Hospital?
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-8">
            Experience the future of hospital management with CareSphere's AI-powered platform.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={(e) => handleLinkClick(e, '#doctors')} className="btn-primary flex items-center gap-2">
              <ExternalLink size={16} />
              Explore Now
            </button>
            <button onClick={(e) => handleLinkClick(e, '/about')} className="btn-secondary">Learn More</button>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-12" />

        {/* Footer Grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Activity className="w-5 h-5" style={{color: 'white'}} />
              </div>
              <span className="text-xl font-outfit font-bold">
                <span className="text-slate-800">Care</span>
                <span className="text-gradient">Sphere</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              An AI-powered Hospital Resource Management platform designed to monitor and optimize hospital operations continuously. Built with MERN Stack.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-cyan-500 hover:border-cyan-300 hover:bg-cyan-50 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Platform</h4>
            <ul className="space-y-3">
              {[
                { label: 'Doctors', href: '#doctors' },
                { label: 'Patients', href: '#patients' },
                { label: 'Nurses', href: '#nurses' },
                { label: 'Reports', href: '#reports' },
                { label: 'Details', href: '#details' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={(e) => handleLinkClick(e, item.href)} className="text-sm text-slate-500 hover:text-cyan-500 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'Teams', href: '/team' },
                { label: 'Contact', href: '/contact' },
                { label: 'Help / FAQ', href: '/help' },
                { label: 'Home', href: '/' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={(e) => handleLinkClick(e, item.href)} className="text-sm text-slate-500 hover:text-cyan-500 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 CareSphere — MERN Stack Hospital Management System
          </p>
          <p className="text-slate-500 text-xs flex items-center gap-1">
            Built with <Heart size={10} className="text-rose-500 fill-rose-500" /> at Amrita Vishwa Vidyapeetham
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
