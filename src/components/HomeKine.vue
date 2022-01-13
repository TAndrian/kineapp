<template>
  <section class="login-block">
    <div class="auth-box card">
      <div class="card-block">
        <h1>Kine Home</h1>
        <br />
        <ul>
          <li v-for="rdv in rdvs" :key="rdv.message">
            <div class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img :src="patientImg" alt="Image" />
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <strong
                      >{{ patients[rdv.user].prenom }}
                      {{ patients[rdv.user].nom }}</strong
                    >
                    <br />
                    {{
                      rdv.start.toDate().toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })
                    }}
                    <br />
                    {{
                      rdv.start.toDate().toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                    ➔
                    {{
                      rdv.end.toDate().toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </div>
                </div>
              </article>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ul>
      <li v-for="item in this.pts" :key="item.age">
        {{ item.prenom }} {{ item.age }}
      </li>
    </ul>
  </section>
</template>

<script>
import { db } from "../main.js";
import firebase from "firebase/app";
// eslint-disable-next-line no-unused-vars
import { RDV, RDVConverter } from "../model/rdv.js";
import { PatientConverter } from "../model/Patient.js";

const patients = {};
const rdvs = [];

export default {
  name: "HomeKine",
  data: function () {
    return {
      patients,
      rdvs,
      patientImg: "https://semantic-ui.com/images/avatar2/large/matthew.png",
    };
  },
  created() {
    /*
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((tokenResult) => {
            console.log(tokenResult.claims);
          });
      }
    });
    */

    let today = new Date();
    today.setHours(0);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0);

    let ids = [];

    db.collection("rdv")
      .withConverter(RDVConverter)
      .where("start", ">", firebase.firestore.Timestamp.fromDate(today))
      .where("start", "<", firebase.firestore.Timestamp.fromDate(tomorrow))
      .get()
      .then((query) => {
        query.forEach((doc) => {
          this.rdvs.push(doc.data());
          ids.push(doc.data().user);
        });
        db.collection("patient")
          .withConverter(PatientConverter)
          .where(firebase.firestore.FieldPath.documentId(), "in", ids)
          .get()
          .then((query) =>
            query.forEach((doc) => (this.patients[doc.id] = doc.data()))
          )
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    // db.collection('patient').get().then(querySnapshot => patients = querySnapshot.docs.map(doc => doc.data()));
    // db.collection('rdv').withConverter(RDVConverter).add(new RDV(0, firebase.firestore.Timestamp.now(), firebase.firestore.Timestamp.now()));
    /*
    db.collection("rdv")
      .doc("3")
      .withConverter(RDVConverter)
      .set(new RDV(0, firebase.firestore.Timestamp.now(), firebase.firestore.Timestamp.now()));  
    */
  },

  methods: {},
};
</script>

You can import the css file on App.vue, inside the style tag.

<style lang="css">
@import "../assets/bulma.min.css";

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1),
    0 11px 6px -7px rgba(43, 43, 43, 0.1);
  box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1),
    0 11px 6px -7px rgba(43, 43, 43, 0.1);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #fff;
}

li {
  margin-bottom: 10px;
}

.card .card-block {
  padding: 1.25rem;
}

.heading {
  font-size: 21px;
}

img {
  border-radius: 50%;
}
</style>
