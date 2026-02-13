'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigation, type Page } from '@/context/NavigationContext';

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com/yourusername' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/in/yourusername' },
  { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/yourusername' },
  { name: 'Email', icon: FaEnvelope, href: 'mailto:your.email@example.com' },
];

const footerLinks: { name: string; page: Page }[] = [
  { name: 'Home', page: 'home' },
  { name: 'About', page: 'about' },
  { name: 'Projects', page: 'projects' },
  { name: 'Contact', page: 'contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-white/50 dark:bg-accent-900/30 backdrop-blur-sm border-t border-primary-200/50 dark:border-accent-800/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <button onClick={() => navigateTo('home')} className="inline-block">
              <span className="text-2xl font-bold heading-gradient">{'<HI />'}</span>
            </button>
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
                  <button
                    onClick={() => navigateTo(link.page)}
                    className="text-ink-medium dark:text-primary-300 hover:text-ink dark:hover:text-primary-100 transition-colors text-sm cursor-pointer"
                  >
                    {link.name}
                  </button>
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
