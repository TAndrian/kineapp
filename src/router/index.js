import { createRouter, createWebHashHistory } from "vue-router";
import Connexion from "../views/Connexion.vue";
import HomePageKine from "../views/HomePageKine.vue";
import HomePagePatient from "../views/HomePagePatient.vue";
import EDT from "../views/EDT.vue";
import Exercice from "../views/Exercice.vue";
import Patient from "../views/Patient.vue";
import RDV from "../views/RDV.vue";
import PagePatientFormulaire from "../views/PagePatientFormulaire.vue";

import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Calendrier from "../components/Calendrier.vue";
import firebase from "firebase";
import ListPatient from "../components/ListPatient.vue";
import FichePatient from "../components/FichePatient.vue";



const routes = [
  {
    path: "/",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    path: "/Calendrier",
    name: "Calendrier",
    component: Calendrier,
  },

  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      guest: true,
    },
  },

  {
    path: "/PagePatientFormulaire",
    name: "PagePatientFormulaire",
    component: PagePatientFormulaire,
  },

  {
    path: "/HomePageKine",
    name: "HomePageKine",
    component: HomePageKine,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "/RDV",
        name: "RDV",
        component: RDV,
      },
      {
        path: "/EDT",
        name: "EDT",
        component: EDT,
      },
      {
        path: "/Exercice",
        name: "Exercice",
        component: Exercice,
      },
      {
        path: "/Patient",
        name: "Patient",
        component: Patient,
      },
    ],
  },

  {
    path: "/HomePagePatient",
    name: "HomePagePatient",
    component: HomePagePatient,
    meta: {
      auth: true,
    },
  },

  {
    path: "/ListPatient",
    name: "ListPatient",
    component: ListPatient,
    meta: {
      auth: true,
    },
  },

  {
    path: "/FichePatient/:id",
    name: "FichePatient",
    
    component: FichePatient,
    meta: {
      auth: true,
    },
  },
  

];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  firebase.auth().onAuthStateChanged((userAuth) => {
    if (userAuth) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(function ({ claims }) {
          if (claims.patient) {
            if (to.path !== "/HomePagePatient")
              return next({
                path: "/HomePagePatient",
              });
          } else if (claims.admin) {
            if (to.path !== "/HomePageKine")
              return next({
                path: "/HomePageKine",
              });
          }
        });
    } else {
      if (to.matched.some((record) => record.meta.auth)) {
        next({
          path: "/ListPatient",
          query: {
            redirect: to.fullPath,
          },
        });
      } else {
        next();
      }
    }
  });

  next();
});

export default router;
