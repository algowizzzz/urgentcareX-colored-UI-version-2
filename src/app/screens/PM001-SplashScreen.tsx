import { useEffect, useState } from 'react';
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
      {/* Logo X */}
      <div className="mb-6">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <path
            d="M20 10L50 50L80 10H95L58 55L95 95H80L50 58L20 95H5L42 55L5 10H20Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* App Name */}
      <h1
        className="text-[32px] font-bold text-white mb-2"
        style={{ fontFamily: "'Alice', serif" }}
      >
        UrgentCareX
      </h1>

      {/* Tagline */}
      <p className="text-base text-white/80 mb-16">
        Find Care Fast
      </p>

      {/* Loading Progress Bar */}
      <div className="w-[200px]">
        <Progress value={progress} className="h-1 bg-white/20 [&>div]:bg-white" />
      </div>
    </div>
  );
}
