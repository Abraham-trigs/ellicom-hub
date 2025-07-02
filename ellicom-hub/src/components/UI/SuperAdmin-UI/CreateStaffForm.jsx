import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useCreateStaffAdminStore from '../../store/SuperAdminStore/CreateStaffAdminStore';

const CreateStaffForm = () => {
  const navigate = useNavigate();

  const {
    form,
    generated,
    loading,
    feedback,
    copied,
    showForm,
    showModal,
    setRole,
    setFormField,
    previewCredentials,
    handleCopy,
    createAccount,
    closeModal,
  } = useCreateStaffAdminStore();

  const handleChange = (e) => {
    setFormField(e.target.name, e.target.value);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    previewCredentials();
  };

  const handleCreate = () => {
    createAccount(navigate);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow relative">
      <div className="flex justify-between mb-4 gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-1/2"
          onClick={() => setRole('staff')}
        >
          Create Staff
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded w-1/2"
          onClick={() => setRole('admin')}
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

      {feedback && (
        <p className="mt-4 text-sm text-center text-red-600">{feedback}</p>
      )}

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
                onClick={closeModal}
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
