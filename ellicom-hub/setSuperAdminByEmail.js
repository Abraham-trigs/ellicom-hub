import admin from 'firebase-admin';
import readline from 'readline';
import { createRequire } from 'module';

// 🔐 Load Firebase Admin SDK service account credentials
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

// 🛠 Initialize Firebase Admin with service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// 🖥️ Setup CLI interface to receive email input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 📥 Ask for email and assign "superadmin" custom claim
rl.question('📧 Enter the email of the user to make SuperAdmin: ', async (email) => {
  try {
    // 🔍 Get user record by email from Firebase Auth
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    // 🔏 Set custom claims (adds "role": "superadmin")
    await admin.auth().setCustomUserClaims(uid, { role: 'superadmin' });

    console.log(`✅ Success! ${email} is now a SuperAdmin (UID: ${uid})`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
});

/*
📄 File: assignSuperAdminClaim.js

🧠 Purpose:
- CLI utility for assigning "superadmin" role to a Firebase Auth user via custom claims.

🛠 Dependencies:
- Requires a valid `serviceAccountKey.json` from Firebase Admin SDK.

🔒 Security:
- Only use this script internally by trusted developers/admins.

📌 Firestore Reminder:
- This does NOT write to Firestore — a separate document must be created manually
  or via backend function under: superadmins/{UID}
*/
