import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { ArrowLeft, Search } from 'lucide-react';

interface ChronicConditionsProps {
  onContinue: (conditions: string[]) => void;
  onSkip: () => void;
  onBack: () => void;
  initialData?: string[];
}

const COMMON_CONDITIONS = [
  'Diabetes (Type 1)',
  'Diabetes (Type 2)',
  'Hypertension (High BP)',
  'High Cholesterol',
  'Heart Disease',
  'Asthma',
  'COPD',
  'Arthritis',
  'Depression',
  'Anxiety',
  'Thyroid Disease',
  'Cancer (current/history)',
];

export default function ChronicConditions({ onContinue, onSkip, onBack, initialData }: ChronicConditionsProps) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    initialData || ['Hypertension', 'Type 2 Diabetes']
  );
  const [noneSelected, setNoneSelected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleCondition = (condition: string) => {
    setNoneSelected(false);
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const handleNoneToggle = () => {
    setNoneSelected(!noneSelected);
    if (!noneSelected) {
      setSelectedConditions([]);
    }
  };

  const handleContinue = () => {
    onContinue(noneSelected ? [] : selectedConditions);
  };

  const filteredConditions = COMMON_CONDITIONS.filter(condition =>
    condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Progress */}
      <div className="px-4 pt-4 pb-4 border-b border-[#E5E7EB]">
        <button onClick={onBack} className="p-2 mb-4">
          <ArrowLeft className="w-6 h-6 text-[#1F2937]" />
        </button>
        <div className="px-2">
          <p className="text-sm font-medium text-[#6B7280] mb-2">
            Step 1 of 9
          </p>
          <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="h-full bg-[#1F2937] rounded-full" style={{ width: '11.11%' }}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-8 pt-6">
          {/* Headline */}
          <h1 className="text-[28px] font-bold text-[#1F2937] mb-3">
            Chronic Conditions
          </h1>

          {/* Subhead */}
          <p className="text-base text-[#6B7280] mb-6">
            Do you have any ongoing health conditions?
          </p>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search conditions..."
              className="h-[52px] rounded-xl border-[#E5E7EB] text-base pl-12"
            />
          </div>

          {/* Common Conditions */}
          <h3 className="text-base font-semibold text-[#1F2937] mb-4">
            Common Conditions
          </h3>

          <div className="space-y-3 mb-6">
            {filteredConditions.map((condition) => (
              <div
                key={condition}
                onClick={() => handleToggleCondition(condition)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={() => handleToggleCondition(condition)}
                />
                <label className="text-base text-[#1F2937] cursor-pointer flex-1">
                  {condition}
                </label>
              </div>
            ))}
          </div>

          {/* None of the above */}
          <div
            onClick={handleNoneToggle}
            className="flex items-center gap-3 cursor-pointer mb-6 p-4 bg-[#F3F4F6] rounded-xl"
          >
            <Checkbox
              checked={noneSelected}
              onCheckedChange={handleNoneToggle}
            />
            <label className="text-base text-[#1F2937] cursor-pointer flex-1">
              None of the above
            </label>
          </div>

          {/* Selected Count */}
          {!noneSelected && selectedConditions.length > 0 && (
            <p className="text-sm text-[#6B7280] mb-6">
              Selected: {selectedConditions.length} condition{selectedConditions.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="bg-white border-t border-[#E5E7EB] p-4">
        <div className="flex gap-3">
          <Button 
            onClick={onSkip}
            variant="outline"
            className="flex-1 h-[52px] border-[#E5E7EB] text-[#1F2937] rounded-xl text-base font-medium hover:bg-[#F3F4F6]"
          >
            Skip
          </Button>
          <Button 
            onClick={handleContinue}
            className="flex-1 h-[52px] bg-[#D97706] text-white rounded-xl text-base font-medium hover:bg-[#B45309]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}