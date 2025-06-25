// components/SuperAdmin/CreateStaffForm.jsx
import React, { useState } from 'react';
import { useStaffStore } from '../../stores/useStaffStore'; // ✅ Zustand Store

const CreateStaffForm = () => {
  const { createStaff, loading } = useStaffStore(); // Zustand actions
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'staff',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createStaff(formData);
    if (success) {
      setFormData({ name: '', email: '', role: 'staff' });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center text-gold mb-4">
        Create Staff/Admin Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            required
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            required
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-gold text-white rounded-md hover:bg-yellow-600"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default CreateStaffForm;


//
// CreateStaffForm.jsx – SuperAdmin-only form for staff/admin account creation
//
// Role: UI component responsible for submitting staff or admin data
//
// Features:
//   - Captures name, email, and role input from SuperAdmin
//   - Calls Zustand action `createStaff()` to trigger backend Cloud Function
//   - Handles loading state and resets form after success
//
// Notes:
//   - Scoped only to SuperAdmin (component should be protected by RequireRole)
//   - Cloud Function handles sensitive logic like ID generation, temp password, and email
//   - This form is lean: all backend interaction lives in the Zustand store
//
// Folder: /components/SuperAdmin/CreateStaffForm.jsx
// Author: Abraham Bortey Danfa
//
