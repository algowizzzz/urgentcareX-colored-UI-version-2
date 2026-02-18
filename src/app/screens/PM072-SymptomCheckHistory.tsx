import { Button } from '../components/ui/button';
import { ArrowLeft, MessageSquare, Trash2, Eye, Clock } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

export interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  options?: string[];
}

export interface ChatSession {
  sessionId: string;
  messages: Message[];
  startedAt: Date;
  lastUpdatedAt: Date;
  status: 'in-progress' | 'completed' | 'abandoned';
  firstMessage: string;
}

interface SymptomCheckHistoryProps {
  sessions: ChatSession[];
  onViewTranscript: (sessionId: string) => void;
  onResumeSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onBack: () => void;
  onNavigateHome?: () => void;
  onNavigateAppointments?: () => void;
  onNavigateProfile?: () => void;
}

export default function SymptomCheckHistory({ 
  sessions, 
  onViewTranscript,
  onResumeSession,
  onDeleteSession,
  onBack,
  onNavigateHome,
  onNavigateAppointments,
  onNavigateProfile
}: SymptomCheckHistoryProps) {
  // Sort sessions by most recent first
  const sortedSessions = [...sessions].sort((a, b) => 
    b.lastUpdatedAt.getTime() - a.lastUpdatedAt.getTime()
  );

  const getStatusBadge = (status: ChatSession['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2 py-1 bg-[#D97706] text-white text-xs rounded-full">
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-2 py-1 bg-[#D97706]/70 text-white text-xs rounded-full">
            In Progress
          </span>
        );
      case 'abandoned':
        return (
          <span className="px-2 py-1 bg-[#D97706]/40 text-white text-xs rounded-full">
            Abandoned
          </span>
        );
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[#D97706] flex items-center px-4 py-4">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-lg font-semibold text-white ml-2">History</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {sortedSessions.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-10 h-10 text-[#6B7280]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No Symptom Checks Yet</h3>
            <p className="text-sm text-[#6B7280] mb-6">
              Start a symptom check and your conversations will appear here
            </p>
          </div>
        ) : (
          // Sessions List
          <div className="px-6 py-6 space-y-4">
            {sortedSessions.map((session) => (
              <div 
                key={session.sessionId}
                className="bg-white border border-[#E5E7EB] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                {/* Session Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#6B7280]" />
                      <p className="text-xs text-[#6B7280]">{formatDate(session.startedAt)}</p>
                    </div>
                    {getStatusBadge(session.status)}
                  </div>
                  <button
                    onClick={() => onDeleteSession(session.sessionId)}
                    className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-[#6B7280]" />
                  </button>
                </div>

                {/* First Message Preview */}
                <p className="text-sm text-[#1F2937] mb-4 line-clamp-2">
                  {session.firstMessage}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => onViewTranscript(session.sessionId)}
                    variant="outline"
                    className="flex-1 h-[40px] border-[#D97706] text-[#D97706] rounded-lg text-sm font-medium hover:bg-[#D97706]/5"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  
                  {session.status === 'in-progress' && (
                    <Button
                      onClick={() => onResumeSession(session.sessionId)}
                      className="flex-1 h-[40px] bg-[#D97706] text-white rounded-lg text-sm font-medium hover:bg-[#B45309]"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0">
        <BottomNavigation
          activeTab="history"
          onNavigateHome={onNavigateHome || (() => {})}
          onNavigateAppointments={onNavigateAppointments || (() => {})}
          onNavigateHistory={() => {}}
          onNavigateProfile={onNavigateProfile || (() => {})}
        />
      </div>
    </div>
  );
}