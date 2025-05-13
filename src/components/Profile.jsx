import React from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-6 px-4 py-10 min-h-screen">
      
      {/* Edit Profile Form */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="card bg-base-300 w-80 shadow-md p-4">
          <EditProfile />
        </div>
      </div>

      {/* Profile Preview */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="card bg-base-200 w-80 shadow-md p-4">
          <div className="card-body items-center text-center px-4 py-5">
            <h2 className="card-title mb-4 text-lg">Profile Preview</h2>
            <img
              src={user?.photoUrl || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full shadow-md mb-4"
            />
            <p><strong>First Name:</strong> {user?.firstName || '-'}</p>
            <p><strong>Last Name:</strong> {user?.lastName || '-'}</p>
            <p><strong>Age:</strong> {user?.age || '-'}</p>
            <p><strong>Gender:</strong> {user?.gender || '-'}</p>
            <p><strong>About:</strong> {user?.about || '-'}</p>
            <p><strong>Skills:</strong> {user?.skills?.join(', ') || '-'}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
