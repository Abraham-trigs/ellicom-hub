
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCreateAccountStore = create(
  persist(
    (set, get) => ({
      form: { name: '', email: '', role: '' },
      generated: { password: '', staffID: '' },

      uid: '',
      referralCode: '',

      loading: false,
      feedback: '',
      error: '',
      copied: false,
      showForm: false,
      showModal: false,

      setFormField: (field, value) =>
        set(state => ({
          form: { ...state.form, [field]: value },
        })),

      setRole: role =>
        set(() => ({
          form: { name: '', email: '', role },
          generated: { password: '', staffID: '' },
          showForm: true,
          showModal: false,
          feedback: '',
          error: '',
          uid: '',
          referralCode: '',
        })),

      previewCredentials: () => {
        const { form } = get();
        const password = Array(10)
          .fill(0)
          .map(() =>
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
              Math.floor(Math.random() * 62)
            )
          )
          .join('');
        const prefix = form.name.split(' ')[0] || 'User';
        const staffID = `${prefix}${Math.floor(100 + Math.random() * 900)}`;
        set({ generated: { password, staffID }, showModal: true });
      },

      handleCopy: text => {
        navigator.clipboard.writeText(text);
        set({ copied: true });
        setTimeout(() => set({ copied: false }), 2000);
      },

      createAccount: async (navigate) => {
        const { form, generated } = get();

        set({ loading: true, error: '', feedback: '' });

        try {
          const response = await fetch('http://localhost:5001/staff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              role: form.role,
              password: generated.password,
              staffID: generated.staffID,
              createdAt: new Date().toISOString(),
            }),
          });

          const result = await response.json();

          if (!response.ok) throw new Error(result.error || 'Server Error');

          set({
            uid: result.uid,
            referralCode: result.referralCode,
            feedback: '✅ Account created and saved.',
            error: '',
            showModal: false,
          });

          setTimeout(() => navigate('/superadmin/dashboard'), 2500);
        } catch (err) {
          console.error('❌ createAccount error:', err);
          set({ error: err.message || 'Something went wrong.' });
        } finally {
          set({ loading: false });
        }
      },

      closeModal: () => set({ showModal: false }),
    }),
    {
      name: 'create-staff-admin-store',
      partialize: state => ({
        form: state.form,
        generated: state.generated,
        uid: state.uid,
        referralCode: state.referralCode,
      }),
    }
  )
);

export default useCreateAccountStore;
