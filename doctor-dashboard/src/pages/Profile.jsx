import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../services/api';
import { User, Mail, Phone, Stethoscope, Calendar, Award, MapPin, Edit2, Save, X, Camera, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
    bio: '',
    location: '',
    education: '',
    licenseNumber: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        specialty: user.specialty || '',
        experience: user.experience || '',
        bio: user.bio || '',
        location: user.location || '',
        education: user.education || '',
        licenseNumber: user.licenseNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await usersAPI.updateProfile(formData);
      setUser(response.data.data.user);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      
      // Create FormData
      const formData = new FormData();
      formData.append('photo', file);

      // Upload photo
      const response = await usersAPI.uploadProfilePhoto(formData);
      
      // Update user context
      setUser(response.data.data.user);
      setPhotoPreview(null);
      
      toast.success('Profile photo updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!window.confirm('Are you sure you want to delete your profile photo?')) {
      return;
    }

    try {
      setUploading(true);
      await usersAPI.deleteProfilePhoto();
      
      // Update user context
      setUser({ ...user, profilePhoto: null });
      
      toast.success('Profile photo deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete photo');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        specialty: user.specialty || '',
        experience: user.experience || '',
        bio: user.bio || '',
        location: user.location || '',
        education: user.education || '',
        licenseNumber: user.licenseNumber || '',
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
          <p className="text-gray-600 mt-1">Manage your professional information</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center">
              {/* Profile Photo */}
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center">
                  {user?.profilePhoto ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${user.profilePhoto}`}
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl font-bold text-white">
                      {user?.name?.charAt(0) || 'D'}
                    </span>
                  )}
                </div>
                
                {/* Upload/Delete Buttons */}
                <div className="absolute bottom-0 right-0 flex gap-1">
                  <button
                    onClick={handlePhotoClick}
                    disabled={uploading}
                    className="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
                    title="Upload Photo"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  
                  {user?.profilePhoto && (
                    <button
                      onClick={handleDeletePhoto}
                      disabled={uploading}
                      className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
              
              {uploading && (
                <p className="text-sm text-primary-600 mb-2">Uploading...</p>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900">{user?.name}</h3>
              <p className="text-primary-600 font-medium mt-1">{user?.specialty}</p>
              <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
                <Award className="w-4 h-4" />
                <span className="text-sm">{user?.experience || 0} years experience</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                </div>
              </div>
              
              {user?.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{user?.phone}</p>
                  </div>
                </div>
              )}

              {user?.location && (
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">{user?.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-sm font-medium">
                    {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Professional Information</h3>
            
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`input pl-10 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={true}
                    className="input pl-10 bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Phone & Specialty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`input pl-10 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`input pl-10 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Experience & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`input pl-10 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`input pl-10 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                  placeholder="e.g., MBBS, MD - Cardiology"
                />
              </div>

              {/* License Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                  placeholder="e.g., MED-123456"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                  placeholder="Brief description of your professional background and expertise..."
                />
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
