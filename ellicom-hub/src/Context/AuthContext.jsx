import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // Firebase Auth user object
  const [role, setRole] = useState(null);        // Role from custom claims or fallback Firestore
  const [loading, setLoading] = useState(true);  // Controls loading state while checking auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          // 🔁 Refresh token to ensure latest custom claims are used
          await firebaseUser.getIdToken(true);

          // 🧠 Attempt to get role from custom claims (preferred)
          const tokenResult = await getIdTokenResult(firebaseUser);
          const customRole = tokenResult.claims.role;

          if (customRole) {
            setRole(customRole);
          } else {
            // ⚠️ Fallback to Firestore if role claim is missing
            const userRef = doc(db, 'staff', firebaseUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setRole(userSnap.data().role || null);
            } else {
              console.warn('⚠️ User role not found in Firestore');
              setRole(null);
            }
          }
        } catch (error) {
          console.error('🔥 Error retrieving user role:', error);
          setRole(null);
        }
      } else {
        // 🚫 No user signed in – treat as guest
        setUser(null);
        setRole(null);
      }

      setLoading(false); // Always clear loading flag
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // 🔍 Role-based access flags
  const isSuperAdmin = role === 'superadmin';
  const isStaff = role === 'staff' || role === 'admin';

  // 🧼 Guest logic – anyone not logged in and without a role
  const isGuest = !user && !role;

  // 🔧 Flexible utility: check if current user has one of several roles
  const hasRole = (rolesArray) => rolesArray.includes(role);

  return (
    <AuthContext.Provider value={{ user, role, isSuperAdmin, isStaff, isGuest, hasRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🪝 Custom hook to use AuthContext anywhere in the app
export const useAuth = () => useContext(AuthContext);


















// This AuthProvider sets up a global authentication and role-based access context for the Ellicom-hub app. It:

// ✅ Listens to Firebase Auth changes (onAuthStateChanged)

// 🔑 Tries to get the user's role from custom claims first (fast & secure)

// 🧯 Falls back to Firestore if no custom claims are set

// 🧠 Exposes useful flags:

// isSuperAdmin – true if role is 'superadmin'

// isStaff – true if role is 'staff' or 'admin'

// isGuest – true if no user is logged in

// 🔧 Provides hasRole(['role1', 'role2']) to check custom roles

// 🚦 Includes a loading flag to manage auth state delays

// This makes it easy to protect routes, show/hide UI, and enforce secure access rules across your entire app.

