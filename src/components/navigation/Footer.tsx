'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { usePageNavigation } from '@/app/page';

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com/yourusername' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/in/yourusername' },
  { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/yourusername' },
  { name: 'Email', icon: FaEnvelope, href: 'mailto:your.email@example.com' },
];

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentPage, navigateToHero, navigateToMain } = usePageNavigation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    // If clicking Home, go back to hero page
    if (targetId === 'home') {
      navigateToHero();
      return;
    }

    // For other sections, navigate to main page if not already there
    if (currentPage === 'hero') {
      navigateToMain();
      // After transition, scroll to the section
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);
    } else {
      // Already on main page, just scroll
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-white/50 dark:bg-accent-900/30 backdrop-blur-sm border-t border-primary-200/50 dark:border-accent-800/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="inline-block">
              <span className="text-2xl font-bold heading-gradient">{'<HI />'}</span>
            </a>
            <p className="text-ink-medium dark:text-primary-300 text-sm">
              Full Stack Developer creating bug-free, user-friendly experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ink dark:text-primary-100">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-ink-medium dark:text-primary-300 hover:text-ink dark:hover:text-primary-100 transition-colors text-sm cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ink dark:text-primary-100">
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-primary-200/50 dark:bg-accent-800/50 text-ink dark:text-primary-200 hover:bg-ink hover:text-primary-50 dark:hover:bg-primary-100 dark:hover:text-ink transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-200/50 dark:border-accent-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-ink-medium dark:text-primary-300 text-sm">
              &copy; {currentYear} Hafiz Idris. All rights reserved.
            </p>
            <p className="text-ink-medium dark:text-primary-300 text-sm">
              Built with Next.js, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
