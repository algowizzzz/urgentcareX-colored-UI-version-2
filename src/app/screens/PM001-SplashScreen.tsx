import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Progress } from '../components/ui/progress';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#D97706] px-8 overflow-hidden">
      {/* Logo X - drops in from top then fades in */}
      <motion.div
        className="mb-6"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14, duration: 0.8 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <motion.path
            d="M20 10L50 50L80 10H95L58 55L95 95H80L50 58L20 95H5L42 55L5 10H20Z"
            fill="#FFFFFF"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{ pathLength: { duration: 1, ease: 'easeInOut' }, fillOpacity: { delay: 0.6, duration: 0.5 } }}
            stroke="#FFFFFF"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* App Name - fades up */}
      <motion.h1
        className="text-[32px] font-bold text-white mb-2"
        style={{ fontFamily: "'Alice', serif" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      >
        UrgentCareX
      </motion.h1>

      {/* Tagline - fades up after name */}
      <motion.p
        className="text-base text-white/80 mb-16"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
      >
        Find Care Fast
      </motion.p>

      {/* Loading Progress Bar - fades in last */}
      <motion.div
        className="w-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <Progress value={progress} className="h-1 bg-white/20 [&>div]:bg-white" />
      </motion.div>
    </div>
  );
}
