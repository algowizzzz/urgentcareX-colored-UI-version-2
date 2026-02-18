import { useEffect, useState } from 'react';
import { Progress } from '../components/ui/progress';
import logo from '../../assets/logo.svg';

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
      {/* Logo */}
      <div className="mb-6">
        <img src={logo} alt="UrgentCareX Logo" width={160} height={160} />
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
