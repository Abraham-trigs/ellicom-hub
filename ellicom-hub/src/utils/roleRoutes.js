// src/utils/roleRoutes.js

const getJobRouteForRole = (role) => {
  switch (role) {
    case 'superadmin':
      return '/superadmin/add-job';
    case 'admin':
      return '/admin/add-job';
    case 'staff':
      return '/staff/add-job';
    case 'client':
      return '/client/add-job';
    case 'guest':
      return '/guest/add-job';
    default:
      return '/unauthorized'; // fallback if role is unknown or tampered
  }
};

export default getJobRouteForRole;
