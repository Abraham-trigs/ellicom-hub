import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const JobCardButton = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setRole(userSnap.data().role);
          } else {
            console.warn('No user doc found.');
          }
        } catch (err) {
          console.error('Failed to fetch user role:', err);
        }
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [user]);

  const handleClick = () => {
    if (!role) return;

    if (role === 'client') navigate('/Client/Add-Job');
    else if (role === 'staff') navigate('/staff/add-job');
    else if (role === 'admin') navigate('/admin/new-job');
    else navigate('/unauthorized'); // fallback route
  };

  if (loading) return <p className="text-gray-400 text-sm">Checking access...</p>;

  if (!role) return null;

  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        onClick={handleClick}
        className='bg-gold py-1 text-ground rounded-lg font-bold text-2xl text-center
        transition ease-in-out duration-200 hover:bg-high hover:scale-95 px-2'
      >
        New Job <span className='p-3 py-2 font-black'> + </span>
      </button>
    </div>
  );
};

export default JobCardButton;
