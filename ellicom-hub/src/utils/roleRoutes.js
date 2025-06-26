
export const getJobRouteForRole = (role) => {
  const routeMap = {
    client: '/Client/Add-Job',
    staff: '/staff/add-job',
    admin: '/admin/new-job',
    superadmin: '/SuperAdmin/dashboard', // optional
  };

  return routeMap[role] || '/unauthorized';
};

export default getJobRouteForRole;
