import { useState } from 'react';
import { Button } from '../components/ui/button';
import { ArrowLeft, Camera, Upload, X } from 'lucide-react';

interface InsuranceCardPhotoProps {
  onContinue: (photos: { front?: string; back?: string }) => void;
  onSkip: () => void;
  onBack: () => void;
  initialData?: { front?: string; back?: string };
}

export default function InsuranceCardPhoto({ onContinue, onSkip, onBack, initialData }: InsuranceCardPhotoProps) {
  const [frontPhoto, setFrontPhoto] = useState<string | undefined>(initialData?.front);
  const [backPhoto, setBackPhoto] = useState<string | undefined>(initialData?.back);

  const handleFileUpload = (side: 'front' | 'back') => {
    // Simulate file upload
    const demoImageUrl = 'https://via.placeholder.com/350x220/F3F4F6/6B7280?text=Insurance+Card+' + side.toUpperCase();
    
    if (side === 'front') {
      setFrontPhoto(demoImageUrl);
    } else {
      setBackPhoto(demoImageUrl);
    }
  };

  const handleRemovePhoto = (side: 'front' | 'back') => {
    if (side === 'front') {
      setFrontPhoto(undefined);
    } else {
      setBackPhoto(undefined);
    }
  };

  const handleContinue = () => {
    onContinue({ front: frontPhoto, back: backPhoto });
  };

  const PhotoUploadCard = ({ 
    side, 
    photo, 
    onUpload, 
    onRemove 
  }: { 
    side: 'front' | 'back'; 
    photo?: string; 
    onUpload: () => void; 
    onRemove: () => void;
  }) => (
    <div className="border-2 border-dashed border-[#E5E7EB] rounded-2xl p-6 mb-4">
      <h3 className="text-base font-semibold text-[#1F2937] mb-4">
        Card {side === 'front' ? 'Front' : 'Back'}
      </h3>
      
      {photo ? (
        <div className="relative">
          <img 
            src={photo} 
            alt={`Insurance card ${side}`}
            className="w-full h-[180px] object-cover rounded-xl"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-[#F3F4F6]"
          >
            <X className="w-5 h-5 text-[#EF4444]" />
          </button>
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              onClick={onUpload}
              className="text-sm text-[#1F2937] hover:underline"
            >
              Replace Photo
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-[#F3F4F6] rounded-xl h-[180px] flex flex-col items-center justify-center mb-3">
            <Camera className="w-12 h-12 text-[#6B7280] mb-2" />
            <p className="text-sm text-[#6B7280]">No photo added</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onUpload}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm font-medium text-[#1F2937] hover:bg-[#F3F4F6]"
            >
              <Camera className="w-4 h-4" />
              Take Photo
            </button>
            <button
              onClick={onUpload}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm font-medium text-[#1F2937] hover:bg-[#F3F4F6]"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );

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
            Insurance Card Photos
          </h1>

          {/* Subhead */}
          <p className="text-base text-[#6B7280] mb-6">
            Upload photos of your insurance card for faster verification (optional).
          </p>

          {/* Tips Card */}
          <div className="bg-[#F3F4F6] rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-[#1F2937] mb-2">📸 Photo Tips:</p>
            <ul className="text-sm text-[#6B7280] space-y-1 ml-4">
              <li>• Ensure all text is clearly visible</li>
              <li>• Use good lighting</li>
              <li>• Avoid glare and shadows</li>
              <li>• Capture the entire card</li>
            </ul>
          </div>

          {/* Photo Upload Cards */}
          <PhotoUploadCard
            side="front"
            photo={frontPhoto}
            onUpload={() => handleFileUpload('front')}
            onRemove={() => handleRemovePhoto('front')}
          />

          <PhotoUploadCard
            side="back"
            photo={backPhoto}
            onUpload={() => handleFileUpload('back')}
            onRemove={() => handleRemovePhoto('back')}
          />

          {/* Security Notice */}
          <div className="flex items-start gap-2 mb-6 p-4 bg-[#F3F4F6] rounded-xl">
            <span className="text-lg">🔒</span>
            <p className="text-sm text-[#6B7280]">
              Your insurance card photos are encrypted and stored securely.
            </p>
          </div>
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