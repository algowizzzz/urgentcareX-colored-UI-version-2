import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface MedicalHistoryIntroProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function MedicalHistoryIntro({ onContinue, onBack }: MedicalHistoryIntroProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-4 border-b border-[#E5E7EB]">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#1F2937]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-8 pt-6">
          {/* Headline */}
          <h1 className="text-[28px] font-bold text-[#1F2937] mb-3">
            Your Medical Background
          </h1>

          {/* Subhead */}
          <p className="text-base text-[#6B7280] mb-8">
            This information helps providers understand your health needs better.
          </p>

          {/* Security Info Box */}
          <div className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔒</div>
              <div>
                <p className="text-sm text-[#6B7280]">
                  Your information is protected by HIPAA and encrypted.
                </p>
              </div>
            </div>
          </div>

          {/* What we'll ask */}
          <h3 className="text-base font-semibold text-[#1F2937] mb-4">
            We'll ask about:
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1F2937]"></div>
              <p className="text-base text-[#6B7280]">Chronic conditions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1F2937]"></div>
              <p className="text-base text-[#6B7280]">Past surgeries</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1F2937]"></div>
              <p className="text-base text-[#6B7280]">Family medical history</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1F2937]"></div>
              <p className="text-base text-[#6B7280]">Allergies</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1F2937]"></div>
              <p className="text-base text-[#6B7280]">Current medications</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1F2937]"></div>
              <p className="text-base text-[#6B7280]">Lifestyle factors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="bg-white border-t border-[#E5E7EB] p-4">
        <Button 
          onClick={onContinue}
          className="w-full h-[52px] bg-[#D97706] text-white rounded-xl text-base font-medium hover:bg-[#B45309]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}