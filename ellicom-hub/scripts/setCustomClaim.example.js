import 'dotenv/config';
import admin from 'firebase-admin';

admin.initializeApp();

const uid = process.env.TARGET_UID;
const role = process.env.TARGET_ROLE;

await admin.auth().setCustomUserClaims(uid, { role });
console.log(`Set ${role} role for UID: ${uid}`);
