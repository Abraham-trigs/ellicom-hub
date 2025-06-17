
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth, db} from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // Firebase Auth user object
  const [role, setRole] = useState(null);        // Custom role from Firestore: 'staff', 'admin', 'superadmin'
  const [loading, setLoading] = useState(true);  // Controls loading state while checking auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          // Fetch user role from 'staff' collection in Firestore
          const userRef = doc(db, 'staff', firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setRole(userSnap.data().role);
          } else {
            console.warn('⚠️ User role not found in Firestore');
            setRole(null);
          }
        } catch (error) {
          console.error('🔥 Error fetching user role:', error);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false); // Always clear loading flag
    });

    return () => unsubscribe(); // Cleanup auth listener on unmount
  }, []);

  // Role-based access flags
  const isSuperAdmin = role === 'superadmin';
  const isStaff = role === 'staff' || role === 'admin';

  return (
    <AuthContext.Provider value={{ user, role, isSuperAdmin, isStaff, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext anywhere in the app
export const useAuth = () => useContext(AuthContext);
