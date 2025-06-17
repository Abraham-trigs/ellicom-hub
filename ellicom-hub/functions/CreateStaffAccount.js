
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.firestore();

// Utility to generate random password
function generatePassword(length = 10) {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
}

// Utility to generate unique Staff ID (e.g., Abraham082)
function generateStaffID(name) {
  const randomDigits = Math.floor(100 + Math.random() * 900); // 3-digit
  const prefix = name.split(" ")[0];
  return `${prefix}${randomDigits}`;
}

// Email transporter (will adjust with real SMTP credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "yourpassword",
  },
});

// Cloud Function to create a staff account (triggered via callable function)
exports.createStaffAccount = functions.https.onCall(async (data, context) => {
  const { name, email, role } = data;

  // Ensure request comes from an authenticated user
  const callerUid = context.auth?.uid;
  if (!callerUid) {
    throw new functions.https.HttpsError("unauthenticated", "Authentication required.");
  }

  // Verify the caller is a superadmin
  const callerDoc = await db.collection("users").doc(callerUid).get();
  if (!callerDoc.exists || callerDoc.data().role !== "superadmin") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only super admins can create staff/admin accounts."
    );
  }

  // Generate password and staff ID
  const password = generatePassword();
  const staffID = generateStaffID(name);

  try {
    // Create Firebase Authentication user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Store staff details in Firestore
    await db.collection("staff").doc(userRecord.uid).set({
      id: staffID,
      name,
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      canChangePassword: true,
    });

    // Send login credentials via email
    await transporter.sendMail({
      from: "Ellicom Hub <youremail@gmail.com>",
      to: email,
      subject: "Your EllicomHub Staff Account",
      html: `
        <p>Hello ${name},</p>
        <p>Your staff account has been successfully created. Please use the credentials below to log in:</p>
        <ul>
          <li><b>Staff ID:</b> ${staffID}</li>
          <li><b>Temporary Password:</b> ${password}</li>
        </ul>
        <p><b>Note:</b> You are required to change your password after your first login.</p>
        <p>Best regards,<br/>Ellicom Hub Team</p>
      `,
    });

    return { success: true, staffID };
  } catch (error) {
    console.error("Error creating staff account:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});
