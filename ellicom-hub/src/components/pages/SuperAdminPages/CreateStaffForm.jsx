// src/UI/SuperAdmin-UI/CreateStaffForm.jsx
// 👥 Form to create a new Staff/Admin and assign role via Cloud Function

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { assignCustomRole } from '../../utils/firebaseRoleUtils';

const CreateStaffForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff', // default to staff
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      // 🔐 1. Create Auth user
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCred.user.uid;

      // 🗂️ 2. Save Firestore profile
      await setDoc(doc(db, 'staff', uid), {
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: new Date(),
      });

      // 🚀 3. Set Custom Role via Cloud Function
      const resultMsg = await assignCustomRole(uid, form.role);

      setFeedback(resultMsg); // ✅ Show success
    } catch (err) {
      console.error('CreateStaff Error:', err.message);
      setFeedback(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Create New Staff</h2>

      <input
        name="name"
        placeholder="Full Name"
        className="w-full mb-2 p-2 border rounded"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full mb-2 p-2 border rounded"
        value={form.password}
        onChange={handleChange}
        required
      />

      <select
        name="role"
        className="w-full mb-2 p-2 border rounded"
        value={form.role}
        onChange={handleChange}
      >
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-gold text-white py-2 px-4 rounded hover:bg-yellow-600"
      >
        {loading ? 'Creating...' : 'Create Staff'}
      </button>

      {feedback && <p className="mt-4 text-sm text-center">{feedback}</p>}
    </form>
  );
};

export default CreateStaffForm;

/*
🛠️ CreateStaffForm.jsx Summary

✅ Handles staff/admin creation from SuperAdmin dashboard
✅ Creates Firebase Auth account
✅ Saves profile in Firestore under 'staff' collection
✅ Assigns role via secure Cloud Function using assignCustomRole()
👀 Shows feedback message for success/error
*/

