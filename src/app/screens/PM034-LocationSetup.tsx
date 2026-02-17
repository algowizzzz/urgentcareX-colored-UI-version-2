import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, MapPin } from 'lucide-react';

interface LocationSetupProps {
  onContinue: (location: string) => void;
  onBack: () => void;
  initialData?: { zipCode: string; city: string; state: string };
}

export default function LocationSetup({ onContinue, onBack, initialData }: LocationSetupProps) {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [zipCode, setZipCode] = useState(initialData?.zipCode || '90210');
  const [city, setCity] = useState(initialData?.city || 'Los Angeles');
  const [state, setState] = useState(initialData?.state || 'CA');

  const handleUseCurrentLocation = () => {
    // Simulate getting current location
    setUseCurrentLocation(true);
    setZipCode('90017');
    setTimeout(() => {
      onContinue('90017');
    }, 1000);
  };

  const handleContinue = () => {
    if (zipCode.trim() !== '') {
      onContinue(zipCode);
    }
  };

  const isValid = zipCode.trim() !== '';

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
            Set Your Location
          </h1>

          {/* Subhead */}
          <p className="text-base text-[#6B7280] mb-8">
            We'll use this to find providers near you.
          </p>

          {/* Use Current Location Card */}
          <button
            onClick={handleUseCurrentLocation}
            disabled={useCurrentLocation}
            className="w-full bg-white border-2 border-[#E5E7EB] rounded-2xl p-6 mb-6 hover:bg-[#F3F4F6] transition-colors disabled:opacity-50"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-[#1F2937]" />
              </div>
              <h3 className="text-base font-semibold text-[#1F2937]">
                Use My Current Location
              </h3>
              <p className="text-sm text-[#6B7280] text-center">
                We'll detect your location automatically
              </p>
              {useCurrentLocation && (
                <p className="text-sm text-[#10B981]">✓ Location detected</p>
              )}
            </div>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-[#E5E7EB]"></div>
            <span className="text-sm text-[#6B7280]">or</span>
            <div className="flex-1 h-[1px] bg-[#E5E7EB]"></div>
          </div>

          {/* ZIP Code Input */}
          <div className="mb-6">
            <label className="text-sm font-medium text-[#374151] mb-2 block">
              Enter ZIP Code or City
            </label>
            <Input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="90017"
              className="h-[52px] rounded-xl border-[#E5E7EB] text-base"
            />
          </div>
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