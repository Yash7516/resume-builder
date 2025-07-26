// ProfileInfoCard.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { cardStyles } from '../assets/dummystyle.js';

 const ProfileInfoCard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  if (!user || !user.name) return null; // Don't render if no user or user has no name

  

  return (
  <div className={cardStyles.profileCard}>
  <div className={cardStyles.profileInitialsContainer}>
    {user.name.charAt(0).toUpperCase()}
  </div>
  <div className="flex flex-col justify-center">
    <span className={cardStyles.profileName}>{user.name}</span>
    <button className={cardStyles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  </div>
</div>

  );
};

export default ProfileInfoCard;

