const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
  if (authUser.email) {
    const customClaims = {
      patient: true,
    };
    try {
      var _ = await admin
        .auth()
        .setCustomUserClaims(authUser.uid, customClaims);

      return db.collection("roles").doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims,
      });
    } catch (error) {
      console.log(error);
    }
  }
});
