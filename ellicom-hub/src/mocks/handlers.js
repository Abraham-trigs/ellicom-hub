// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

// 🌐 Load users from sessionStorage if available, else fallback
let users = JSON.parse(sessionStorage.getItem('ellicom_users')) || [
  {
    id: '1',
    email: 'super@ellicom.com',
    password: '123456',
    role: 'superadmin',
    name: 'Superadmin User',
  },
];

// 🧠 Sync to sessionStorage
const persistUsers = () => {
  sessionStorage.setItem('ellicom_users', JSON.stringify(users));
};

export const handlers = [
  // 🔐 Login Handler
  http.post('http://localhost:5001/login', async ({ request }) => {
    const { email, password } = await request.json();

    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return HttpResponse.json({ user }, { status: 200 });
  }),

  // 👨‍💼 Create Staff
  http.post('http://localhost:5001/staff', async ({ request }) => {
    const newStaff = await request.json();

    const uid = `staff_${Math.floor(Math.random() * 10000)}`;
    const referralCode = `ref_${Math.random().toString(36).substring(2, 8)}`;

    const staffWithID = {
      ...newStaff,
      id: uid,
      referralCode,
    };

    users.push(staffWithID);
    persistUsers();
    console.log('✅ [MSW] Created staff:', staffWithID);

    return HttpResponse.json({ uid, referralCode }, { status: 201 });
  }),

  // 🧑‍💼 Create Admin
  http.post('http://localhost:5001/admin', async ({ request }) => {
    const newAdmin = await request.json();

    const uid = `admin_${Math.floor(Math.random() * 10000)}`;
    const referralCode = `ref_${Math.random().toString(36).substring(2, 8)}`;

    const adminWithID = {
      ...newAdmin,
      id: uid,
      referralCode,
    };

    users.push(adminWithID);
    persistUsers();
    console.log('✅ [MSW] Created admin:', adminWithID);

    return HttpResponse.json({ uid, referralCode }, { status: 201 });
  }),

  // 🧍 Create Client
  http.post('http://localhost:5001/client', async ({ request }) => {
    const newClient = await request.json();

    const uid = `client_${Math.floor(Math.random() * 10000)}`;
    const referralCode = `ref_${Math.random().toString(36).substring(2, 8)}`;

    const clientWithID = {
      ...newClient,
      id: uid,
      referralCode,
    };

    users.push(clientWithID);
    persistUsers();
    console.log('✅ [MSW] Created client:', clientWithID);

    return HttpResponse.json({ uid, referralCode }, { status: 201 });
  }),

  // 📥 GET All Users
  http.get('http://localhost:5001/users', () => {
    return HttpResponse.json(users, { status: 200 });
  }),

  // 🗑️ DELETE User
  http.delete('http://localhost:5001/users/:userId', ({ params }) => {
    const { userId } = params;
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const deletedUser = users.splice(index, 1)[0];
    persistUsers();
    console.log(`🗑️ [MSW] Deleted user:`, deletedUser);

    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];
