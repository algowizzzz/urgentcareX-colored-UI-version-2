import { useState } from 'react';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, Clock, CheckCircle, MessageSquare, ClipboardList, Building2 } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

interface Appointment {
  id: string;
  providerName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  rosCompleted?: boolean; // Add ROS completion tracking
  type?: 'doctor' | 'facility'; // Provider type
}

interface UpcomingAppointmentsProps {
  onViewDetails: (appointment: Appointment) => void;
  onBack: () => void;
  initialFilter?: 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
  onMarkComplete?: () => void;
  onLeaveReview?: (appointment: Appointment) => void;
  onViewHistory?: () => void;
  onViewProfile?: () => void;
  onCompleteROS?: (appointmentId: string) => void; // Add ROS callback
  onRebook?: (appointment: Appointment) => void; // Rebook cancelled appointment
}

const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    providerName: 'Dr. Sarah Johnson',
    specialty: 'Primary Care Physician',
    date: '2026-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    rosCompleted: true,
    type: 'doctor'
  },
  {
    id: '2',
    providerName: 'Dr. Michael Chen',
    specialty: 'Internal Medicine',
    date: '2026-01-20',
    time: '2:30 PM',
    status: 'confirmed',
    rosCompleted: false,
    type: 'doctor'
  },
  {
    id: '3',
    providerName: 'Dr. Emily Rodriguez',
    specialty: 'Family Medicine',
    date: '2026-02-05',
    time: '11:00 AM',
    status: 'pending',
    rosCompleted: true,
    type: 'doctor'
  },
  {
    id: '4',
    providerName: 'Dr. James Williams',
    specialty: 'Urgent Care',
    date: '2026-01-05',
    time: '3:00 PM',
    status: 'completed',
    rosCompleted: true,
    type: 'doctor'
  },
  {
    id: '5',
    providerName: 'Dr. Lisa Anderson',
    specialty: 'Family Medicine',
    date: '2025-12-28',
    time: '9:30 AM',
    status: 'completed',
    rosCompleted: true,
    type: 'doctor'
  },
  // Facility appointments
  {
    id: 'f1',
    providerName: 'CityHealth Urgent Care Center',
    specialty: 'Urgent Care',
    date: '2026-01-18',
    time: '3:30 PM',
    status: 'confirmed',
    rosCompleted: false,
    type: 'facility'
  },
  {
    id: 'f2',
    providerName: 'Memorial Medical Center',
    specialty: 'Hospital',
    date: '2026-02-10',
    time: '9:00 AM',
    status: 'pending',
    rosCompleted: false,
    type: 'facility'
  },
  {
    id: 'f3',
    providerName: 'QuickCare Walk-In Clinic',
    specialty: 'Walk-In Clinic',
    date: '2026-01-08',
    time: '1:00 PM',
    status: 'completed',
    rosCompleted: true,
    type: 'facility'
  },
  // Cancelled appointments
  {
    id: 'c1',
    providerName: 'Dr. Robert Martinez',
    specialty: 'Dermatology',
    date: '2026-01-10',
    time: '2:00 PM',
    status: 'cancelled',
    rosCompleted: false,
    type: 'doctor'
  },
  {
    id: 'c2',
    providerName: 'Westside Family Health Center',
    specialty: 'Family Medicine',
    date: '2026-01-12',
    time: '10:30 AM',
    status: 'cancelled',
    rosCompleted: false,
    type: 'facility'
  }
];

export default function UpcomingAppointments({ onViewDetails, onBack, initialFilter, onMarkComplete, onLeaveReview, onViewHistory, onViewProfile, onCompleteROS, onRebook }: UpcomingAppointmentsProps) {
  const [appointments] = useState<Appointment[]>(DEMO_APPOINTMENTS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>(initialFilter || 'all');

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-[#D97706]';
      case 'pending': return 'bg-[#D97706]/60';
      case 'completed': return 'bg-[#D97706]';
      case 'cancelled': return 'bg-[#EF4444]';
      default: return 'bg-[#D97706]';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const handleMarkComplete = (e: React.MouseEvent, appointmentId: string) => {
    e.stopPropagation();
    // In a real app, this would update the appointment status
    if (onMarkComplete) {
      onMarkComplete();
    }
  };

  const handleLeaveReview = (e: React.MouseEvent, appointment: Appointment) => {
    e.stopPropagation();
    // In a real app, this would navigate to the review screen
    if (onLeaveReview) {
      onLeaveReview(appointment);
    }
  };

  const handleCompleteROS = (e: React.MouseEvent, appointmentId: string) => {
    e.stopPropagation();
    // In a real app, this would update the ROS completion status
    if (onCompleteROS) {
      onCompleteROS(appointmentId);
    }
  };

  const handleRebook = (e: React.MouseEvent, appointment: Appointment) => {
    e.stopPropagation();
    // In a real app, this would navigate to the booking flow
    if (onRebook) {
      onRebook(appointment);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[#D97706] flex items-center justify-between px-4 py-4">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-lg font-semibold text-white">Appointments</h2>
        <div className="w-10"></div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-4 py-3 border-b border-[#E5E7EB] overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-[#D97706] text-white'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
          }`}
        >
          All ({appointments.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'pending'
              ? 'bg-[#D97706] text-white'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
          }`}
        >
          Pending ({appointments.filter(a => a.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('confirmed')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'confirmed'
              ? 'bg-[#D97706] text-white'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
          }`}
        >
          Confirmed ({appointments.filter(a => a.status === 'confirmed').length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'completed'
              ? 'bg-[#D97706] text-white'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
          }`}
        >
          Completed ({appointments.filter(a => a.status === 'completed').length})
        </button>
        <button
          onClick={() => setFilter('cancelled')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'cancelled'
              ? 'bg-[#EF4444] text-white'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
          }`}
        >
          Cancelled ({appointments.filter(a => a.status === 'cancelled').length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        {filteredAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="w-24 h-24 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-12 h-12 text-[#6B7280]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No Appointments</h3>
            <p className="text-sm text-[#6B7280] text-center">
              You don't have any upcoming appointments
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                onClick={() => onViewDetails(appointment)}
                className="border border-[#E5E7EB] rounded-2xl p-5 hover:border-[#D97706] transition-colors cursor-pointer"
              >
                {/* Type Badge */}
                <div className="flex items-center gap-2 mb-3">
                  {appointment.type === 'facility' ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1F2937]/5 rounded-full">
                      <Building2 className="w-3.5 h-3.5 text-[#1F2937]" />
                      <span className="text-xs font-medium text-[#1F2937]">Facility</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#10B981]/10 rounded-full">
                      <span className="text-xs font-medium text-[#10B981]">Individual Doctor</span>
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#1F2937] mb-1">
                      {appointment.providerName}
                    </h3>
                    <p className="text-sm text-[#6B7280] mb-3">
                      {appointment.specialty}
                    </p>
                  </div>
                  <div className={`px-3 py-1 ${getStatusColor(appointment.status)}/10 rounded-full`}>
                    <p className={`text-xs font-medium ${getStatusColor(appointment.status).replace('bg-', 'text-')}`}>
                      {getStatusText(appointment.status)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {(appointment.status === 'pending' || appointment.status === 'confirmed') && !appointment.rosCompleted && (
                  <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <button
                      onClick={(e) => handleCompleteROS(e, appointment.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D97706] text-white rounded-xl text-sm font-medium hover:bg-[#B45309] transition-colors"
                    >
                      <ClipboardList className="w-4 h-4" />
                      Complete ROS
                    </button>
                  </div>
                )}

                {appointment.status === 'confirmed' && (
                  <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <button
                      onClick={(e) => handleMarkComplete(e, appointment.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D97706] text-white rounded-xl text-sm font-medium hover:bg-[#B45309] transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Complete
                    </button>
                  </div>
                )}

                {appointment.status === 'completed' && (
                  <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <button
                      onClick={(e) => handleLeaveReview(e, appointment)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D97706] text-white rounded-xl text-sm font-medium hover:bg-[#B45309] transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Leave a Review
                    </button>
                  </div>
                )}

                {appointment.status === 'cancelled' && (
                  <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <button
                      onClick={(e) => handleRebook(e, appointment)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D97706] text-white rounded-xl text-sm font-medium hover:bg-[#B45309] transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      Rebook Appointment
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0">
        <BottomNavigation
          activeTab="appointments"
          onNavigateHome={onBack}
          onNavigateAppointments={() => {}}
          onNavigateHistory={onViewHistory || (() => {})}
          onNavigateProfile={onViewProfile || (() => {})}
        />
      </div>
    </div>
  );
}