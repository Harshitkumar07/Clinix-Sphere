import { X, User, Calendar, Clock, FileText, Phone, Mail } from 'lucide-react';
import { formatDate } from '../lib/utils';
import { useState } from 'react';
import { appointmentsAPI, prescriptionsAPI } from '../services/api';
import toast from 'react-hot-toast';

const AppointmentDetailModal = ({ appointment, onClose, onUpdate }) => {
  const [status, setStatus] = useState(appointment.status);
  const [notes, setNotes] = useState(appointment.notes || '');
  const [saving, setSaving] = useState(false);

  const handleUpdateStatus = async (newStatus) => {
    try {
      setSaving(true);
      await appointmentsAPI.updateStatus(appointment._id, newStatus);
      setStatus(newStatus);
      toast.success('Appointment status updated');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePrescription = () => {
    // Navigate to prescriptions with patient info
    window.location.href = `/prescriptions?patient=${appointment.patient._id}&appointment=${appointment._id}`;
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
            <p className="text-sm text-gray-600 mt-1">ID: {appointment._id.slice(-8)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Patient Info */}
          <div className="bg-primary-50 rounded-lg p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {appointment.patient?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{appointment.patient?.name}</h3>
                <p className="text-sm text-gray-600">Patient Information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm font-medium text-gray-900">{appointment.patient?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{appointment.patient?.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Date</p>
                <p className="text-sm font-semibold text-gray-900">{formatDate(appointment.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Time</p>
                <p className="text-sm font-semibold text-gray-900">{appointment.time}</p>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Visit
            </label>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900">{appointment.reason}</p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor's Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="input"
              placeholder="Add notes about the appointment..."
            />
          </div>

          {/* Status Update */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Update Status
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => handleUpdateStatus('pending')}
                disabled={saving}
                className={`p-3 rounded-lg border-2 transition-all ${
                  status === 'pending'
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                    : 'border-gray-200 hover:border-yellow-300'
                }`}
              >
                <span className="block text-sm font-medium">Pending</span>
              </button>
              <button
                onClick={() => handleUpdateStatus('confirmed')}
                disabled={saving}
                className={`p-3 rounded-lg border-2 transition-all ${
                  status === 'confirmed'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <span className="block text-sm font-medium">Confirmed</span>
              </button>
              <button
                onClick={() => handleUpdateStatus('completed')}
                disabled={saving}
                className={`p-3 rounded-lg border-2 transition-all ${
                  status === 'completed'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <span className="block text-sm font-medium">Completed</span>
              </button>
              <button
                onClick={() => handleUpdateStatus('cancelled')}
                disabled={saving}
                className={`p-3 rounded-lg border-2 transition-all ${
                  status === 'cancelled'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <span className="block text-sm font-medium">Cancelled</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleCreatePrescription}
              className="flex-1 btn btn-primary flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Create Prescription
            </button>
            <button
              onClick={onClose}
              className="px-6 btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;
