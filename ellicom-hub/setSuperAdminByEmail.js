
import admin from 'firebase-admin';
import readline from 'readline';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('📧 Enter the email of the user to make SuperAdmin: ', async (email) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    await admin.auth().setCustomUserClaims(uid, { role: 'superadmin' });

    console.log(`✅ Success! ${email} is now a SuperAdmin (UID: ${uid})`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
});
