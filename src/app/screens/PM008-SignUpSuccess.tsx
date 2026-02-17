import { Button } from '../components/ui/button';

interface SignUpSuccessProps {
  onSetupProfile: () => void;
  onSkip: () => void;
}

export default function SignUpSuccess({ onSetupProfile, onSkip }: SignUpSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white px-8">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mb-8">
        <svg 
          className="w-10 h-10 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Headline */}
      <h1 className="text-[28px] font-bold text-[#1F2937] mb-3">
        Account Created!
      </h1>

      {/* Body Text */}
      <p className="text-base text-[#6B7280] text-center max-w-[280px] mb-12">
        Your account is ready. Let's set up your profile to get personalized care.
      </p>

      {/* Set Up Profile Button */}
      <Button 
        onClick={onSetupProfile}
        className="w-full max-w-[326px] h-[52px] bg-[#D97706] text-white rounded-xl text-base font-medium hover:bg-[#B45309] mb-4"
      >
        Set Up Profile
      </Button>

      {/* Skip Button */}
      <Button 
        onClick={onSkip}
        variant="outline"
        className="w-full max-w-[326px] h-[52px] bg-white border-[#E5E7EB] text-[#1F2937] rounded-xl text-base font-medium hover:bg-[#F3F4F6]"
      >
        Skip for Now
      </Button>
    </div>
  );
}
