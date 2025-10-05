import { useState } from 'react';
import { prescriptionsAPI } from '../services/api';
import { X, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PrescriptionModal = ({ appointment, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    symptoms: '',
    diagnosis: '',
    medicines: [{ name: '', dosage: '', duration: '' }],
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index][field] = value;
    setFormData({
      ...formData,
      medicines: updatedMedicines,
    });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: '', dosage: '', duration: '' }],
    });
  };

  const removeMedicine = (index) => {
    if (formData.medicines.length > 1) {
      const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        medicines: updatedMedicines,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await prescriptionsAPI.create({
        appointmentId: appointment._id,
        ...formData,
      });
      onSuccess();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create prescription';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Create Prescription</h3>
            <p className="text-sm text-gray-600 mt-1">
              For {appointment.patient?.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Symptoms */}
          <div>
            <label htmlFor="symptoms" className="label">
              Symptoms <span className="text-red-500">*</span>
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              rows={3}
              className="input resize-none"
              placeholder="Describe the patient's symptoms..."
              required
            />
          </div>

          {/* Diagnosis */}
          <div>
            <label htmlFor="diagnosis" className="label">
              Diagnosis <span className="text-red-500">*</span>
            </label>
            <textarea
              id="diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              rows={3}
              className="input resize-none"
              placeholder="Your diagnosis..."
              required
            />
          </div>

          {/* Medicines */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="label mb-0">
                Medicines <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addMedicine}
                className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Medicine</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Medicine #{index + 1}
                    </span>
                    {formData.medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicine(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Medicine name"
                        value={medicine.name}
                        onChange={(e) =>
                          handleMedicineChange(index, 'name', e.target.value)
                        }
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Dosage (e.g., 500mg)"
                        value={medicine.dosage}
                        onChange={(e) =>
                          handleMedicineChange(index, 'dosage', e.target.value)
                        }
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Duration (e.g., 7 days)"
                        value={medicine.duration}
                        onChange={(e) =>
                          handleMedicineChange(index, 'duration', e.target.value)
                        }
                        className="input"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="label">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="input resize-none"
              placeholder="Any additional instructions or notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </span>
              ) : (
                'Create Prescription'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionModal;
