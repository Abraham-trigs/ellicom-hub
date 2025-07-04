import React, { useEffect } from 'react';
import useUserStore from '../../store/UserStore';

const AccountListPage = () => {
  const { allUsers, fetchAllUsers, userLoading, deleteUser } = useUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this account?')) {
      deleteUser(id);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gold mb-4">All Accounts</h1>

      {userLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gold text-ground">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Referral Code</th>  
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id} className="border-t text-coHead">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4">{user.referralCode || '—'}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccountListPage;
