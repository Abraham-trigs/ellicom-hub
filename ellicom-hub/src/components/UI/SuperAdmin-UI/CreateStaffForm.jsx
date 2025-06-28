// src/UI/SuperAdmin-UI/CreateStaffForm.jsx

import React, { useState } from 'react';
import { functions } from '../../../lib/firebase';
import { httpsCallable } from 'firebase/functions';
import { FiCopy } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; 

const CreateStaffForm = () => {
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [generated, setGenerated] = useState({ password: '', staffID: '' });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate(); // ✅ router hook

  const handleRoleClick = (role) => {
    setForm({ ...form, role });
    setShowForm(true);
    setShowModal(false);
    setFeedback('');
    setGenerated({ password: '', staffID: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    const pass = Array(10).fill(0).map(() =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        .charAt(Math.floor(Math.random() * 62))
    ).join('');
    const namePrefix = form.name.split(" ")[0] || "User";
    const id = `${namePrefix}${Math.floor(100 + Math.random() * 900)}`;
    setGenerated({ password: pass, staffID: id });
    setShowModal(true);
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const createAccount = httpsCallable(functions, 'createStaffAccount');
      await createAccount({
        name: form.name,
        email: form.email,
        role: form.role,
      });

      setFeedback('✅ Account created and email sent. Redirecting...');
      setShowModal(false);
      setForm({ name: '', email: '', role: '' });

      // ⏳ Delay before redirect
      setTimeout(() => {
        navigate('/superadmin/dashboard');
      }, 2500);

    } catch (err) {
      setFeedback(`❌ ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow relative">
      <div className="flex justify-between mb-4 gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-1/2"
          onClick={() => handleRoleClick('staff')}
        >
          Create Staff
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded w-1/2"
          onClick={() => handleRoleClick('admin')}
        >
          Create Admin
        </button>
      </div>

      {showForm && (
        <form onSubmit={handlePreview}>
          <h2 className="text-lg font-bold mb-3">New {form.role} Form</h2>

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

          <button
            type="submit"
            className="bg-gold text-ground py-2 px-4 rounded hover:bg-yellow-600 w-full"
          >
            Preview Credentials
          </button>
        </form>
      )}

      {feedback && <p className="mt-4 text-sm text-center">{feedback}</p>}

      {showModal && (
        <div className="fixed inset-0 bg-ground bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm relative">
            <h3 className="text-lg font-bold mb-2">Confirm Account Details</h3>
            <p className="text-sm text-gray-600 mb-2">
              These credentials will be emailed to the staff. You may copy them now.
            </p>
            <div className="mb-3">
              <label className="block text-xs font-bold mb-1">Staff ID</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={generated.staffID}
                  className="w-full border p-2 rounded pr-10"
                />
                <FiCopy
                  onClick={() => handleCopy(generated.staffID)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  title={copied ? 'Copied!' : 'Copy'}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-bold mb-1">Password</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={generated.password}
                  className="w-full border p-2 rounded pr-10"
                />
                <FiCopy
                  onClick={() => handleCopy(generated.password)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  title={copied ? 'Copied!' : 'Copy'}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {loading ? 'Creating...' : 'Confirm & Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStaffForm;
