export const getJobRouteForRole = (role) => {
  const routeMap = {
    client: '/client/add-job',
    staff: '/staff/add-job',
    admin: '/admin/new-job',
    superadmin: '/superadmin/dashboard', // ✅ fixed casing
  };

  return routeMap[role] || '/unauthorized';
};

export default getJobRouteForRole;

/*
📄 File: getJobRouteForRole.js

🧠 Purpose:
- Returns the route path for a user role to redirect after login or access attempts.

📌 Note:
- Route keys must match the role claims set in Firebase (e.g., 'superadmin')
- Route values must match the actual paths defined in React Router

⚠️ Casing matters! 'SuperAdmin' → ❌, use 'superadmin' everywhere for consistency.
*/
