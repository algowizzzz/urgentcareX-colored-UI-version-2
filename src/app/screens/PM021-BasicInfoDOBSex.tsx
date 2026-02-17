import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Calendar } from 'lucide-react';
import PronounsSelector from '../components/PronounsSelector';

interface BasicInfoDOBSexProps {
  onContinue: (data: { dob: string; sex: string; pronouns: string }) => void;
  onBack: () => void;
  initialData?: { dob?: string; sex?: string; pronouns?: string };
}

export default function BasicInfoDOBSex({ onContinue, onBack, initialData }: BasicInfoDOBSexProps) {
  const [dateOfBirth, setDateOfBirth] = useState(initialData?.dob || '1985-06-15');
  const [sex, setSex] = useState(initialData?.sex || 'male');
  const [pronouns, setPronouns] = useState(initialData?.pronouns || '');

  const isValid = dateOfBirth !== '' && sex !== '';

  const handleContinue = () => {
    if (isValid) {
      onContinue({ dob: dateOfBirth, sex, pronouns });
    }
  };

  // Format display date (example: March 15, 1985)
  const getFormattedDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
            Date of Birth
          </h1>

          {/* Subhead */}
          <p className="text-base text-[#6B7280] mb-8">
            This helps providers give age-appropriate care.
          </p>

          {/* Date of Birth */}
          <div className="mb-8">
            <Label htmlFor="dob" className="text-sm font-medium text-[#374151] mb-2 block">
              Date of Birth <span className="text-[#EF4444]">*</span>
            </Label>
            <div className="relative">
              <Input
                id="dob"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="h-[52px] rounded-xl border-[#E5E7EB] text-base pr-12"
                max={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
            </div>
            {dateOfBirth && (
              <p className="text-sm text-[#6B7280] mt-2">
                {getFormattedDate(dateOfBirth)}
              </p>
            )}
          </div>

          {/* Biological Sex */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-[#374151] mb-2 block">
              Biological Sex <span className="text-[#EF4444]">*</span>
            </Label>
            <p className="text-sm text-[#6B7280] mb-4">
              This is used for medical purposes only.
            </p>

            {/* Sex Options */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                onClick={() => setSex('male')}
                className={`h-[72px] rounded-xl border-2 text-base font-medium transition-all ${
                  sex === 'male'
                    ? 'border-[#D97706] bg-[#F3F4F6]'
                    : 'border-[#E5E7EB] bg-white'
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  {sex === 'male' && <span className="text-lg mb-1">✓</span>}
                  <span className="text-[#1F2937]">Male</span>
                </div>
              </button>

              <button
                onClick={() => setSex('female')}
                className={`h-[72px] rounded-xl border-2 text-base font-medium transition-all ${
                  sex === 'female'
                    ? 'border-[#D97706] bg-[#F3F4F6]'
                    : 'border-[#E5E7EB] bg-white'
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  {sex === 'female' && <span className="text-lg mb-1">✓</span>}
                  <span className="text-[#1F2937]">Female</span>
                </div>
              </button>
            </div>

            <button
              onClick={() => setSex('prefer-not-to-say')}
              className={`w-full h-[52px] rounded-xl border-2 text-base font-medium transition-all ${
                sex === 'prefer-not-to-say'
                  ? 'border-[#D97706] bg-[#F3F4F6]'
                  : 'border-[#E5E7EB] bg-white'
              }`}
            >
              Prefer not to say
            </button>
          </div>

          {/* Pronouns */}
          <PronounsSelector
            value={pronouns}
            onChange={setPronouns}
          />
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="bg-white border-t border-[#E5E7EB] p-4">
        <Button 
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full h-[52px] bg-[#D97706] text-white rounded-xl text-base font-medium hover:bg-[#B45309] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}