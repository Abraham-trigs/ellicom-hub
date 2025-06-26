// functions/setCustomClaim.js
const admin = require('firebase-admin');
admin.initializeApp();

const setUserRole = async (uid, role) => {
  await admin.auth().setCustomUserClaims(uid, { role });
  console.log(`Set ${role} role for UID: ${uid}`);
};

setUserRole('Abraham_UID_here', 'superadmin');
