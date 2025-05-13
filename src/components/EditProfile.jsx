import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [age, setAge] = useState(user?.age || '');
  const [gender, setGender] = useState(user?.gender || 'male');
  const [about, setAbout] = useState(user?.about || '');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const skillsArray = skills.split(',').map((s) => s.trim()).filter(Boolean);

      const res = await axios.post(
        BASE_URL + '/profile/edit',
        { firstName, lastName, age, gender, about, skills: skillsArray, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setError('');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm h-[550px] bg-base-200 rounded-xl shadow-md flex flex-col p-4">
      
      {/* ✅ Toasts - Top Center */}
      {(showSuccessToast || showErrorToast) && (
        <div className="toast toast-top toast-center z-50">
          {showSuccessToast && (
            <div className="alert alert-success">
              <span>Profile updated successfully.</span>
            </div>
          )}
          {showErrorToast && (
            <div className="alert alert-error">
              <span>{error || 'Something went wrong.'}</span>
            </div>
          )}
        </div>
      )}

      <h2 className="text-lg font-semibold text-center mb-2">Edit Profile</h2>

      {/* Scrollable Form Fields */}
      <div className="flex-1 overflow-auto pr-1">
        {/* First Name */}
        <fieldset className="mb-2">
          <legend className="text-sm font-medium mb-1">First Name</legend>
          <input
            type="text"
            className="input input-sm w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>

        {/* Last Name */}
        <fieldset className="mb-2">
          <legend className="text-sm font-medium mb-1">Last Name</legend>
          <input
            type="text"
            className="input input-sm w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>

        {/* Age */}
        <fieldset className="mb-2">
          <legend className="text-sm font-medium mb-1">Age</legend>
          <input
            type="number"
            className="input input-sm w-full"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </fieldset>

        {/* Gender */}
        <fieldset className="mb-2">
          <legend className="text-sm font-medium mb-1">Gender</legend>
          <select
            className="input input-sm w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </fieldset>

        {/* ✅ About - Textarea */}
        <fieldset className="mb-2">
          <legend className="text-sm font-medium mb-1">About</legend>
          <textarea
            rows={3}
            className="textarea textarea-sm w-full"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell us about yourself"
          ></textarea>
        </fieldset>

        {/* Skills */}
        <fieldset className="mb-2">
          <legend className="text-sm font-medium mb-1">Skills (comma separated)</legend>
          <input
            type="text"
            className="input input-sm w-full"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </fieldset>

        {/* Photo URL */}
        <fieldset className="mb-2">
          <legend className="text-sm font-medium mb-1">Photo URL</legend>
          <input
            type="text"
            className="input input-sm w-full"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </fieldset>

        {/* Optional inline error text */}
        {error && <p className="text-red-600 text-xs mt-1 text-center">{error}</p>}
      </div>

      {/* Submit Button */}
      <div className="mt-3">
        <button
          className="btn btn-primary btn-sm w-full"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
