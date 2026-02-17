import { useState } from 'react';
import { Button } from '../components/ui/button';
import { ArrowLeft, X } from 'lucide-react';

interface Surgery {
  id: string;
  type: string;
  year: string;
}

interface PastSurgeriesProps {
  onContinue: (surgeries: Surgery[]) => void;
  onSkip: () => void;
  onBack: () => void;
  initialData?: Surgery[];
}

export default function PastSurgeries({ onContinue, onSkip, onBack, initialData }: PastSurgeriesProps) {
  const [surgeries, setSurgeries] = useState<Surgery[]>(
    initialData || [
      { id: '1', type: 'Appendectomy', year: '2015' },
      { id: '2', type: 'Knee Arthroscopy', year: '2019' }
    ]
  );
  const [showModal, setShowModal] = useState(false);
  const [surgeryType, setSurgeryType] = useState('');
  const [customSurgeryType, setCustomSurgeryType] = useState('');
  const [surgeryYear, setSurgeryYear] = useState('');

  const surgeryTypes = [
    // Common Surgeries
    'Appendectomy',
    'Tonsillectomy',
    'Cholecystectomy (Gallbladder Removal)',
    'Cesarean Section (C-Section)',
    'Hernia Repair',
    'Wisdom Teeth Removal',
    'Cataract Surgery',
    // Orthopedic
    'Knee Replacement',
    'Hip Replacement',
    'ACL Reconstruction',
    'Knee Arthroscopy',
    'Spinal Fusion',
    // Major Surgeries
    'Cardiac Bypass',
    'Hysterectomy',
    'Mastectomy',
    'Bariatric Surgery',
    // Catch-all
    'Other'
  ];

  const handleAddSurgery = () => {
    const finalSurgeryType = surgeryType === 'Other' ? customSurgeryType : surgeryType;
    if (finalSurgeryType && surgeryYear) {
      setSurgeries([...surgeries, { id: Date.now().toString(), type: finalSurgeryType, year: surgeryYear }]);
      setSurgeryType('');
      setCustomSurgeryType('');
      setSurgeryYear('');
      setShowModal(false);
    }
  };

  const handleRemoveSurgery = (id: string) => {
    setSurgeries(surgeries.filter((surgery) => surgery.id !== id));
  };

  const handleContinue = () => {
    onContinue(surgeries);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Progress */}
      <div className="px-4 pt-4 pb-4 border-b border-[#E5E7EB]">
        <button onClick={onBack} className="p-2 mb-4">
          <ArrowLeft className="w-6 h-6 text-[#1F2937]" />
        </button>
        <div className="px-2">
          <p className="text-sm font-medium text-[#6B7280] mb-2">
            Step 2 of 9
          </p>
          <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="h-full bg-[#1F2937] rounded-full" style={{ width: '22.22%' }}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-8 pt-6">
          {/* Headline */}
          <h1 className="text-[28px] font-bold text-[#1F2937] mb-3">
            Past Surgeries
          </h1>

          {/* Subhead */}
          <p className="text-base text-[#6B7280] mb-6">
            Have you had any surgeries?
          </p>

          {/* Add Surgery Button */}
          <Button 
            onClick={() => setShowModal(true)}
            variant="outline"
            className="w-full h-[52px] border-[#E5E7EB] text-[#1F2937] rounded-xl text-base font-medium hover:bg-[#F3F4F6] mb-6"
          >
            + Add Surgery
          </Button>

          {/* Your Surgeries */}
          {surgeries.length > 0 && (
            <>
              <h3 className="text-base font-semibold text-[#1F2937] mb-4">
                Your Surgeries
              </h3>
              <div className="space-y-3 mb-6">
                {surgeries.map((surgery) => (
                  <div
                    key={surgery.id}
                    className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-start justify-between"
                  >
                    <div>
                      <p className="text-base font-semibold text-[#1F2937] mb-1">
                        {surgery.type}
                      </p>
                      <p className="text-sm text-[#6B7280]">{surgery.year}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveSurgery(surgery.id)}
                      className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-[#6B7280]" />
                    </button>
                  </div>
                ))}
              </div>
            </>
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

      {/* Add Surgery Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <h2 className="text-xl font-semibold text-[#1F2937] mb-6">Add Surgery</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-[#374151] mb-2 block">
                  Surgery Type
                </label>
                <select
                  value={surgeryType}
                  onChange={(e) => setSurgeryType(e.target.value)}
                  className="w-full h-[52px] px-4 rounded-xl border border-[#E5E7EB] text-base"
                >
                  <option value="">Select surgery type...</option>
                  {surgeryTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {surgeryType === 'Other' && (
                  <input
                    type="text"
                    value={customSurgeryType}
                    onChange={(e) => setCustomSurgeryType(e.target.value)}
                    placeholder="Enter surgery type"
                    className="w-full h-[52px] px-4 rounded-xl border border-[#E5E7EB] text-base mt-2"
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-[#374151] mb-2 block">
                  Year
                </label>
                <select
                  value={surgeryYear}
                  onChange={(e) => setSurgeryYear(e.target.value)}
                  className="w-full h-[52px] px-4 rounded-xl border border-[#E5E7EB] text-base"
                >
                  <option value="">Select year...</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => {
                  setShowModal(false);
                  setSurgeryType('');
                  setCustomSurgeryType('');
                  setSurgeryYear('');
                }}
                variant="outline"
                className="flex-1 h-[52px] border-[#E5E7EB] text-[#1F2937] rounded-xl text-base font-medium"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddSurgery}
                disabled={!surgeryType || !surgeryYear || (surgeryType === 'Other' && !customSurgeryType)}
                className="flex-1 h-[52px] bg-[#D97706] text-white rounded-xl text-base font-medium hover:bg-[#B45309] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}