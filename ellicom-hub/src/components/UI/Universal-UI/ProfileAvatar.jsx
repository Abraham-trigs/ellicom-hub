
import React from 'react';
import { UserCircle } from 'lucide-react';

const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  const initials = parts.slice(0, 2).map((part) => part[0].toUpperCase());
  return initials.join('');
};

const ProfileAvatar = ({ name, photoURL, size = 'w-16 h-16', className = '' }) => {
  const initials = getInitials(name);

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt="Profile"
        className={`rounded-full object-cover border-2 border-gold ${size} ${className}`}
      />
    );
  }

  if (initials) {
    return (
      <div
        className={`bg-sea text-ground flex items-center justify-center rounded-full text-xl font-semibold ${size} ${className}`}
      >
        {initials}
      </div>
    );
  }

  // 🔁 If no photoURL or name → show 👤 fallback icon
  return (
    <div
      className={`bg-inactive flex items-center justify-center rounded-full ${size} ${className}`}
    >
      <UserCircle className="w-2/3 h-2/3 text-gold" />
    </div>
  );
};

export default ProfileAvatar;
