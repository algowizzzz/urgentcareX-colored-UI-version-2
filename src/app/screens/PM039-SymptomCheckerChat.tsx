import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  options?: string[];
}

interface SymptomCheckerChatProps {
  onComplete: (symptoms: string[]) => void;
  onBack: () => void;
  sessionId?: string | null;
  initialMessages?: Message[];
  onSaveMessages?: (sessionId: string, messages: Message[]) => void;
  onCreateSession?: () => string;
  onMarkComplete?: (sessionId: string) => void;
}

// Mock conversation flow - simple demo without real-time state
const MOCK_CONVERSATION: Message[] = [
  {
    id: '1',
    text: "Hello! I'm here to help understand your symptoms. Let's start with what's bothering you today.",
    sender: 'ai' as const,
    timestamp: new Date()
  },
  {
    id: '2',
    text: "What is your primary symptom or concern?",
    sender: 'ai' as const,
    timestamp: new Date(),
    options: ['Headache', 'Fever', 'Cough', 'Stomach pain', 'Other']
  }
];

export default function SymptomCheckerChat({ onComplete, onBack }: SymptomCheckerChatProps) {
  const [messages, setMessages] = useState<Message[]>(MOCK_CONVERSATION);
  const [inputText, setInputText] = useState('');
  const [conversationStep, setConversationStep] = useState(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setSymptoms(prev => [...prev, text]);
    setInputText('');

    // Simulate AI response based on conversation step
    setTimeout(() => {
      let aiResponse: Message;

      if (conversationStep === 0) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: `I understand you're experiencing ${text.toLowerCase()}. How long have you been experiencing this symptom?`,
          sender: 'ai',
          timestamp: new Date(),
          options: ['Less than 1 day', '1-3 days', '3-7 days', 'More than a week']
        };
        setConversationStep(1);
      } else if (conversationStep === 1) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "On a scale of 1-10, how would you rate the severity of your symptoms?",
          sender: 'ai',
          timestamp: new Date(),
          options: ['1-3 (Mild)', '4-6 (Moderate)', '7-9 (Severe)', '10 (Unbearable)']
        };
        setConversationStep(2);
      } else if (conversationStep === 2) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "Are you experiencing any other symptoms?",
          sender: 'ai',
          timestamp: new Date(),
          options: ['Nausea', 'Dizziness', 'Fatigue', 'Body aches', 'No other symptoms']
        };
        setConversationStep(3);
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for providing that information. I'm analyzing your symptoms now to provide personalized recommendations...",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);

        // Complete the conversation after final message
        setTimeout(() => {
          onComplete(symptoms);
        }, 2000);
        return;
      }

      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  // Simulated voice recording and transcription
  const handleMicClick = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);

      // Simulate speech-to-text transcription after a short delay
      setTimeout(() => {
        const mockTranscriptions = [
          "I have a severe headache",
          "I've been experiencing fever and body aches",
          "My stomach has been hurting for the past two days",
          "I have a persistent cough and feel tired",
          "I'm feeling dizzy and nauseous"
        ];
        const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
        setInputText(randomTranscription);
      }, 500);
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white flex items-center gap-3 px-4 py-3 border-b border-[#E5E7EB]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5 text-[#1F2937]" />
        </button>
        <div className="flex items-center gap-2.5 flex-1">
          <div className="w-9 h-9 bg-[#D97706] rounded-xl flex items-center justify-center">
            <span className="text-white text-sm font-bold">X</span>
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-[#1F2937] leading-tight">Symptom Checker</h2>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
              <span className="text-[11px] text-[#10B981] font-medium">AI Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="space-y-4 max-w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[80%]">
                {message.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 bg-[#D97706] rounded-lg flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">X</span>
                    </div>
                    <span className="text-[11px] text-[#9CA3AF] font-medium">UrgentCareX AI</span>
                  </div>
                )}

                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-[#D97706] text-white rounded-tr-md'
                      : 'bg-white text-[#1F2937] rounded-tl-md border border-[#E5E7EB]'
                  }`}
                  style={message.sender === 'ai' ? { boxShadow: '0 1px 2px rgba(0,0,0,0.04)' } : {}}
                >
                  <p className="text-[15px] leading-relaxed">{message.text}</p>
                </div>

                {/* Option Buttons - only show on last AI message */}
                {message.options && message.sender === 'ai' && message.id === messages[messages.length - 1].id && (
                  <div className="mt-2.5 space-y-2">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[15px] text-[#1F2937] hover:border-[#D97706]/40 hover:bg-[#FFFBEB] transition-all group"
                        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
                      >
                        <span className="group-hover:text-[#D97706] transition-colors">{option}</span>
                      </button>
                    ))}
                  </div>
                )}

                {message.sender === 'user' && (
                  <p className="text-[11px] text-[#9CA3AF] mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-[#E5E7EB] p-3" style={{ boxShadow: '0 -1px 3px rgba(0,0,0,0.04)' }}>
        {/* Recording Indicator */}
        {isRecording && (
          <div className="mb-3 flex items-center justify-center gap-2 text-[#EF4444] animate-pulse">
            <div className="w-2.5 h-2.5 bg-[#EF4444] rounded-full"></div>
            <span className="text-xs font-medium">Recording...</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder={isRecording ? "Listening..." : "Describe your symptoms..."}
              className="w-full h-[44px] px-4 rounded-xl border border-[#E5E7EB] text-[15px] focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]/20 bg-[#F9FAFB] transition-all"
              disabled={isRecording}
            />
          </div>
          <button
            onClick={handleMicClick}
            className={`w-[44px] h-[44px] rounded-xl flex items-center justify-center transition-all shrink-0 ${
              isRecording
                ? 'bg-[#EF4444] hover:bg-[#DC2626] ring-4 ring-[#EF4444]/20'
                : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-[#E5E7EB]'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-[#6B7280]" />}
          </button>
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={isRecording || !inputText.trim()}
            className="w-[44px] h-[44px] bg-[#D97706] rounded-xl flex items-center justify-center hover:bg-[#B45309] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
