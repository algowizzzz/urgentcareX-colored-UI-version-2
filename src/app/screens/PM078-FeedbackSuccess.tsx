import { Button } from '../components/ui/button';
import { CheckCircle, Home, Star } from 'lucide-react';

interface FeedbackSuccessProps {
  providerName: string;
  rating: number;
  onGoHome: () => void;
  onViewHistory: () => void;
}

export default function FeedbackSuccess({ 
  providerName, 
  rating, 
  onGoHome, 
  onViewHistory 
}: FeedbackSuccessProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Success Header */}
      <div className="bg-[#1F2937] px-6 pt-12 pb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-[#1F2937]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Thank You!
          </h1>
          <p className="text-base text-white/90">
            Your feedback has been submitted
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto pb-8">
        {/* Rating Summary */}
        <div className="bg-white border-2 border-[#6B7280] rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4 text-center">Your Rating</h2>
          
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
              👨‍⚕️
            </div>
            <p className="text-base font-semibold text-[#1F2937]">{providerName}</p>
          </div>

          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 ${
                  star <= rating
                    ? 'fill-[#4B5563] text-[#4B5563]'
                    : 'text-[#E5E7EB]'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-[#6B7280] text-center">
            {rating} out of 5 stars
          </p>
        </div>

        {/* Impact of Feedback */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">How Your Feedback Helps</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-[#F3F4F6] rounded-xl">
              <span className="text-lg">📊</span>
              <div>
                <p className="text-sm font-medium text-[#1F2937] mb-1">Improves Quality</p>
                <p className="text-sm text-[#6B7280]">Helps us maintain high standards of care</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#F3F4F6] rounded-xl">
              <span className="text-lg">👥</span>
              <div>
                <p className="text-sm font-medium text-[#1F2937] mb-1">Helps Others</p>
                <p className="text-sm text-[#6B7280]">Assists other patients in choosing providers</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#F3F4F6] rounded-xl">
              <span className="text-lg">⭐</span>
              <div>
                <p className="text-sm font-medium text-[#1F2937] mb-1">Recognizes Excellence</p>
                <p className="text-sm text-[#6B7280]">Acknowledges outstanding healthcare providers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onGoHome}
            className="w-full h-[52px] bg-[#D97706] text-white rounded-xl text-base font-medium hover:bg-[#B45309]"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}