<template>
  <section class="fichePatientBlock">
    <div class="fichePatientRow">
      <div class="fichePatientCardPatient">
        <div class="fichePatientProfileCircle">
          <h3 class="fichePatientInitial">
            {{ patient.prenom.charAt(0).toUpperCase()}}{{patient.nom.charAt(0).toUpperCase() }} 
            </h3>
        </div>
        <h3 class="fichePatientFullname">
          {{ patient.prenom.charAt(0).toUpperCase()
              }}{{ patient.prenom.slice(1) }}
              {{ patient.nom.charAt(0).toUpperCase()
              }}{{ patient.nom.slice(1) }}
        </h3>
      </div>
    </div>
    <br /><br />
    <div class="fichePatientRow">
      <div class="fichePatientCardInfoPatient">
        <h2 class="fichePatientTitleCathegorie">Information général :</h2>
        <div class="fichePatientLineSeparator"></div>
        <h4 class="fichePatientTexteCathegorie">
          {{ patient.information }}
        </h4>
      </div>
    </div>
    <br />
    <div class="fichePatientRow">
      <div class="fichePatientCardInfoPatient">
        <h2 class="fichePatientTitleCathegorie">Détail pathologique :</h2>
        <div class="fichePatientLineSeparator"></div>
        <h4 class="fichePatientTexteCathegorie">
          {{ patient.pathologie }}
        </h4>
      </div>
    </div>
    <br />
    <div class="fichePatientRow">
      <div class="fichePatientCardInfoPatient">
        <h2 class="fichePatientTitleCathegorie">
          Bilan du dernier rendez-vous :
        </h2>
        <div class="fichePatientLineSeparator"></div>
        <h4 class="fichePatientTexteCathegorie">
          {{ patient.bilan }}
        </h4>
      </div>
    </div>
    <br />
  </section>
</template>

<script>
import { db } from "../main.js";
import { PatientConverter } from "../model/Patient.js";

export default {
  name: "HomeKine",
  created() {
    db.collection('patient')
      .doc(this.$route.params.id)
      .withConverter(PatientConverter)
      .get()
      .then(doc => this.patient = doc.data())
      .catch(error => console.log(error));
  },
  data: function () {
    return {
      patient: undefined,
      patients: undefined,
    };
  },
  methods: {
    clickMethod() {
      this.$router.push("home");
    },
    goToHome() {
      this.router.push({ name: "/#/FichePatient", params: { id: "[aaa]" } });
    },

    async readEmployees() {
      let employeesData = [];
      db.collection("user")
        .get()
        .then((snapshot) => {
          console.log(snapshot.docs);

          snapshot.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data());
          });
        })
        .catch((error) => {
          console.log(error);
        });
      return employeesData;
    },
  },
  urlParam(param) {
    var vars = {};
    window.location.href.replace(location.hash, "").replace(
      /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
      function (m, key, value) {
        // callback
        vars[key] = value !== undefined ? value : "";
      }
    );

    if (param) {
      return vars[param] ? vars[param] : null;
    }
    return vars;
  },
};
</script>
<style lang="css">
.fichePatientBlock {
  border-radius: 5px;
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  margin: 20px auto 0;
  max-width: 85% !important;
}

.fichePatientCardPatient {
  border-radius: 50px;
  -webkit-box-shadow: 0 0 10px 0 rgba(43, 43, 43, 0.1),
    0 11px 6px -7px rgba(43, 43, 43, 0.1);
  box-shadow: 0 0 20px 0 rgba(43, 43, 43, 0.1),
    0 11px 11px 4px rgba(43, 43, 43, 0.1);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #fff;
  padding: 1rem;
}

.fichePatientCardInfoPatient {
  border-radius: 50px;
  -webkit-box-shadow: 0 0 10px 0 rgba(43, 43, 43, 0.1),
    0 11px 6px -7px rgba(43, 43, 43, 0.1);
  box-shadow: 0 0 20px 0 rgba(43, 43, 43, 0.1),
    0 11px 11px 4px rgba(43, 43, 43, 0.1);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #fff;
  padding: 1rem;
}

.fichePatientTitleCathegorie {
  font-size: 31px;
  text-align: left;
  margin-left: 15px;
  font-size: 25px;
  font-weight: bold;
}

.fichePatientTexteCathegorie {
  text-align: left;
  margin-left: 20px;
  font-size: 20px;
}

#infoMessage p {
  color: red !important;
}

.fichePatientRow {
  margin: 100 -50px;
}

.fichePatientProfileCircle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px #000;
  border: 2px solid white;
  background-color: cornflowerblue;
  font-weight: bold;
  font-size: 200%;
  display: table-cell;
  transform: translateY(15%);
}

.fichePatientInitial {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
}

.fichePatientFullname {
  margin: 0;
  top: 50%;
  text-align: center;
  transform: translateX(90%);
  transform: translateY(-225%);
  font-size: 20px;
  font-weight: bold;
}

.fichePatientLineSeparator {
  background-color: #ccc;
  flex-grow: 5;
  height: 1px;
}
</style>
