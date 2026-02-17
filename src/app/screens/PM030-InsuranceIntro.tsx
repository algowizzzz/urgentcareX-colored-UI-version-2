import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface InsuranceIntroProps {
  onAddInsurance: () => void;
  onNoInsurance: () => void;
  onBack: () => void;
}

export default function InsuranceIntro({ onAddInsurance, onNoInsurance, onBack }: InsuranceIntroProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Progress */}
      <div className="px-4 pt-4 pb-4 border-b border-[#E5E7EB]">
        <button onClick={onBack} className="p-2 mb-4">
          <ArrowLeft className="w-6 h-6 text-[#1F2937]" />
        </button>
        <div className="px-2">
          <p className="text-sm font-medium text-[#6B7280] mb-2">
            Step 8 of 9
          </p>
          <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="h-full bg-[#1F2937] rounded-full" style={{ width: '88.89%' }}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-8 pt-6">
          {/* Headline */}
          <h1 className="text-[28px] font-bold text-[#1F2937] mb-3">
            Insurance Information
          </h1>

          {/* Subhead */}
          <p className="text-base text-[#6B7280] mb-8">
            Adding your insurance helps us:
          </p>

          {/* Benefits Cards */}
          <div className="space-y-3 mb-8">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <div>
                  <p className="text-base text-[#1F2937]">
                    Verify your coverage in real-time
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <div>
                  <p className="text-base text-[#1F2937]">
                    Find in-network providers near you
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <div>
                  <p className="text-base text-[#1F2937]">
                    Estimate your out-of-pocket costs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 mb-6 p-4 bg-[#F3F4F6] rounded-xl">
            <span className="text-xl">🔒</span>
            <p className="text-sm text-[#6B7280]">
              Your insurance information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="bg-white border-t border-[#E5E7EB] p-4 space-y-3">
        <Button 
          onClick={onAddInsurance}
          className="w-full h-[52px] bg-[#D97706] text-white rounded-xl text-base font-medium hover:bg-[#B45309]"
        >
          Add Insurance
        </Button>

        <Button 
          onClick={onNoInsurance}
          variant="outline"
          className="w-full h-[52px] border-[#E5E7EB] text-[#1F2937] rounded-xl text-base font-medium hover:bg-[#F3F4F6]"
        >
          I don't have insurance
        </Button>
      </div>
    </div>
  );
}