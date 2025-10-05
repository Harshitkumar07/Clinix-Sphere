const User = require('../models/User.model');
const path = require('path');
const { put, del } = require('@vercel/blob');

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

/**
 * @route   PATCH /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
  try {
    const { name, phone, specialty, experience, bio, location, education, licenseNumber } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (specialty) user.specialty = specialty;
    if (experience) user.experience = experience;
    if (bio) user.bio = bio;
    if (location) user.location = location;
    if (education) user.education = education;
    if (licenseNumber) user.licenseNumber = licenseNumber;

    await user.save();

    // Return user without password
    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/users/profile/photo
 * @desc    Upload profile photo
 * @access  Private
 */
const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete old photo from Vercel Blob if exists
    if (user.profilePhoto) {
      try {
        await del(user.profilePhoto);
      } catch (error) {
        console.error('Error deleting old photo:', error);
        // Continue even if delete fails
      }
    }

    // Upload to Vercel Blob
    const filename = `profiles/${req.user._id}-${Date.now()}${path.extname(req.file.originalname)}`;
    const blob = await put(filename, req.file.buffer, {
      access: 'public',
      contentType: req.file.mimetype
    });

    // Update user with new photo URL
    user.profilePhoto = blob.url;
    await user.save();

    // Return user without password
    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.status(200).json({
      success: true,
      message: 'Profile photo uploaded successfully',
      data: { 
        user: updatedUser,
        photoUrl: user.profilePhoto
      }
    });
  } catch (error) {
    console.error('Upload photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading photo',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/users/profile/photo
 * @desc    Delete profile photo
 * @access  Private
 */
const deleteProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete photo from Vercel Blob if exists
    if (user.profilePhoto) {
      try {
        await del(user.profilePhoto);
      } catch (error) {
        console.error('Error deleting photo from blob:', error);
        // Continue even if delete fails
      }
    }

    // Remove photo from user
    user.profilePhoto = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile photo deleted successfully'
    });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting photo',
      error: error.message
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
  deleteProfilePhoto
};
