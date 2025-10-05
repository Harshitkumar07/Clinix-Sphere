import { useState, useEffect } from 'react';
import { appointmentsAPI, prescriptionsAPI } from '../services/api';
import { formatDate } from '../lib/utils';
import { FileText, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import PrescriptionModal from '../components/PrescriptionModal';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prescriptionsRes, appointmentsRes] = await Promise.all([
        prescriptionsAPI.getAll(),
        appointmentsAPI.getAll({ status: 'completed' }),
      ]);

      setPrescriptions(prescriptionsRes.data.data.prescriptions);
      
      // Filter appointments that don't have prescriptions yet
      const appointments = appointmentsRes.data.data.appointments;
      const appointmentsWithoutPrescription = appointments.filter(
        (apt) => !prescriptionsRes.data.data.prescriptions.some(
          (presc) => presc.appointment?._id === apt._id
        )
      );
      setCompletedAppointments(appointmentsWithoutPrescription);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePrescription = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handlePrescriptionCreated = () => {
    fetchData();
    handleModalClose();
    toast.success('Prescription created successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Prescriptions</h2>
        <p className="text-gray-600 mt-1">Manage patient prescriptions</p>
      </div>

      {/* Completed Appointments Without Prescription */}
      {completedAppointments.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Completed Appointments - Create Prescription
          </h3>
          <div className="space-y-3">
            {completedAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {appointment.patient?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(appointment.date)} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Reason: {appointment.reason}
                  </p>
                </div>
                <button
                  onClick={() => handleCreatePrescription(appointment)}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Prescription</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing Prescriptions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          All Prescriptions
        </h3>
        
        {prescriptions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No prescriptions created yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div
                key={prescription._id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      {prescription.patient?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {formatDate(prescription.createdAt)}
                    </p>
                  </div>
                  <span className="badge badge-completed">
                    Prescription #{prescription._id.slice(-6)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Symptoms
                    </p>
                    <p className="text-sm text-gray-900">{prescription.symptoms}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Diagnosis
                    </p>
                    <p className="text-sm text-gray-900">{prescription.diagnosis}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Prescribed Medicines
                  </p>
                  <div className="space-y-2">
                    {prescription.medicines?.map((medicine, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-3 rounded-lg flex items-start space-x-3"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{medicine.name}</p>
                          <p className="text-sm text-gray-600">
                            Dosage: {medicine.dosage} • Duration: {medicine.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {prescription.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </p>
                    <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded-lg">
                      {prescription.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prescription Modal */}
      {showModal && (
        <PrescriptionModal
          appointment={selectedAppointment}
          onClose={handleModalClose}
          onSuccess={handlePrescriptionCreated}
        />
      )}
    </div>
  );
};

export default Prescriptions;
