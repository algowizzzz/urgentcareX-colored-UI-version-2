export type NavTab = 'home' | 'appointments' | 'history' | 'profile';

interface BottomNavigationProps {
  activeTab: NavTab;
  onNavigateHome: () => void;
  onNavigateAppointments: () => void;
  onNavigateHistory: () => void;
  onNavigateProfile: () => void;
}

/* Custom filled/outlined icon pairs for a polished look */

function HomeIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="#D97706" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AppointmentsIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" fill="#D97706" />
      <path d="M8 2V6M16 2V6" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 10H21" stroke="white" strokeWidth="1.5" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" fill="white" />
      <rect x="14" y="13" width="3" height="3" rx="0.5" fill="white" opacity="0.5" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="#9CA3AF" strokeWidth="1.8" />
      <path d="M8 2V6M16 2V6" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 10H21" stroke="#9CA3AF" strokeWidth="1.5" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#9CA3AF" />
    </svg>
  );
}

function HistoryIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="#D97706" />
      <path d="M12 7V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#9CA3AF" strokeWidth="1.8" />
      <path d="M12 7V12L15 15" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#D97706" />
      <path d="M4 21C4 17.134 7.582 14 12 14C16.418 14 20 17.134 20 21" fill="#D97706" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="1.8" />
      <path d="M4 21C4 17.134 7.582 14 12 14C16.418 14 20 17.134 20 21" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function BottomNavigation({
  activeTab,
  onNavigateHome,
  onNavigateAppointments,
  onNavigateHistory,
  onNavigateProfile
}: BottomNavigationProps) {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: HomeIcon, onClick: onNavigateHome },
    { id: 'appointments' as NavTab, label: 'Appointments', icon: AppointmentsIcon, onClick: onNavigateAppointments },
    { id: 'history' as NavTab, label: 'History', icon: HistoryIcon, onClick: onNavigateHistory },
    { id: 'profile' as NavTab, label: 'Profile', icon: ProfileIcon, onClick: onNavigateProfile },
  ];

  return (
    <div className="bg-white border-t border-[#E5E7EB] px-4 pb-2 pt-1.5 flex justify-around items-center" style={{ boxShadow: '0 -2px 10px rgba(0,0,0,0.04)' }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={tab.onClick}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative ${isActive ? 'bg-[#FFFBEB]' : ''}`}
          >
            {/* Active top bar */}
            {isActive && (
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-[#D97706]" />
            )}
            <div className="relative">
              <Icon active={isActive} />
            </div>
            <span className={`text-[10px] leading-tight ${isActive ? 'text-[#D97706] font-bold' : 'text-[#9CA3AF] font-medium'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
