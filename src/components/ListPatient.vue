<template>
  <section class="listPatientBlock">
    <div class="listPatientRow">
      <div class="listPatient__header">
        <h3 class="listePatientTitle">Liste des patients</h3>
        <router-link to="/PagePatientFormulaire" exact class="nav-item nav-link"
          ><Icon :icon="['fas', 'plus']" /> Ajouter un Patient</router-link
        >
      </div>
      <ul>
        <li v-for="patient in this.patients" :key="patient">
          <div
            class="listPatientCardPatient"            onclick="location.href='#/FichePatient' + patient.id"

            @click="redirectToPatient(patient)"
          >
            <div class="listPatientProfileCircle">
              <h3 class="listPatientInitial">
                {{ patient.prenom.substring(0, 1).toUpperCase()
                }}{{ patient.nom.substring(0, 1).toUpperCase() }}
              </h3>
            </div>
            <h3 class="listPatientFullname">
              {{ patient.prenom.charAt(0).toUpperCase()
              }}{{ patient.prenom.slice(1) }}
              {{ patient.nom.charAt(0).toUpperCase()
              }}{{ patient.nom.slice(1) }}
            </h3>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as Icon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);

import { db } from "../main.js";
import { PatientConverter } from "../model/Patient.js";

export default {
  name: "HomeKine",
  components: {
    Icon,
  },
  created() {
    db.collection("patient")
      .withConverter(PatientConverter)
      .get()
      .then((query) => (this.patients = query.docs.map((doc) => doc.data())))
      .catch((error) => console.log(error));
  },
  data: function () {
    return {
      patients: undefined,
    };
  },
  methods: {
    clickMethod() {
      this.$router.push("home");
    },
    goToHome() {
      this.router.push({ name: "/FichePatient", params: { id: "[aaa]" } });
    },
    getId(e) {
      this.$router.push({ path: "FichePatient", query: { id: e } });
    },
    redirectToPatient(patient){
      this.$router.push("/FichePatient/" + patient.id)
    }
  },
};
</script>
<style lang="css">
.listPatientBlock{
  border-radius: 5px;
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  margin: 20px auto 0;
  max-width: 65% !important;
}

.listPatientCardPatient {
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
  padding: 2.25rem;
}

.listePatientTitle {
  font-size: 31px;
}

#infoMessage p {
  color: red !important;
}

.listPatientRow {
  margin: 100 -50px;
}

.listPatientProfileCircle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px #000;
  border: 2px solid white;
  background-color: cornflowerblue;
  font-weight: bold;
  font-size: 200%;
  display: table-cell;
  transform: translateY(11%);
}

.listPatientInitial{
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
}

.listPatientFullname{
  margin: 0;
  top: 50%;
  text-align: center;
  transform: translateX(90%);
  transform: translateY(-225%);
  font-size: 20px;
  font-weight: bold;
}
</style>