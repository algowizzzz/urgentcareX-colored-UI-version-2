import { Button } from '../components/ui/button';

interface OnboardingCompleteProps {
  onStartFindingCare: () => void;
}

export default function OnboardingComplete({ onStartFindingCare }: OnboardingCompleteProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-8 pt-16 flex flex-col items-center justify-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mb-6">
            <span className="text-5xl text-white">🎉</span>
          </div>

          {/* Headline */}
          <h1 className="text-[28px] font-bold text-[#1F2937] text-center mb-3">
            You're All Set!
          </h1>

          {/* Subhead */}
          <p className="text-base text-[#6B7280] text-center mb-8 max-w-[280px]">
            Your profile is complete. You're ready to find care.
          </p>

          {/* Completion List */}
          <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xl text-[#10B981]">✓</span>
                <p className="text-base text-[#1F2937]">Basic information</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl text-[#10B981]">✓</span>
                <p className="text-base text-[#1F2937]">Medical history</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl text-[#10B981]">✓</span>
                <p className="text-base text-[#1F2937]">Insurance verified</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl text-[#10B981]">✓</span>
                <p className="text-base text-[#1F2937]">Location set</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-2">
            <p className="text-sm text-[#6B7280] text-center mb-2">
              Profile Completion: 100%
            </p>
            <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#D97706] rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="bg-white border-t border-[#E5E7EB] p-4">
        <Button 
          onClick={onStartFindingCare}
          className="w-full h-[52px] bg-[#D97706] text-white rounded-xl text-base font-medium hover:bg-[#B45309]"
        >
          Start Finding Care
        </Button>
      </div>
    </div>
  );
}