'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiHome, HiArrowLeft } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold heading-gradient">404</h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/" className="btn-primary">
              <HiHome className="w-5 h-5 mr-2 inline" />
              Go Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-outline">
              <HiArrowLeft className="w-5 h-5 mr-2 inline" />
              Go Back
            </button>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <div className="text-9xl">🔍</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
