import { rest } from 'msw';

const MOCK_USERS = [
  {
    id: '1',
    email: 'staff@ellicom.com',
    password: '123456',
    role: 'staff',
    name: 'Staff User',
  },
  {
    id: '2',
    email: 'admin@ellicom.com',
    password: '123456',
    role: 'admin',
    name: 'Admin User',
  },
  {
    id: '3',
    email: 'super@ellicom.com',
    password: '123456',
    role: 'superadmin',
    name: 'Superadmin User',
  },
  {
    id: '4',
    email: 'client@ellicom.com',
    password: '123456',
    role: 'client',
    name: 'Client User',
  },
];

export const handlers = [
  rest.post('http://localhost:5001/login', async (req, res, ctx) => {
    const { email, password } = await req.json();

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
    }

    return res(
      ctx.status(200),
      ctx.json({ user }) // matches your Zustand store structure
    );
  }),
];
