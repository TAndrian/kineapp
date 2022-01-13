<template>
  <section class="creationPatient">
    <div class="creationPatient__container">
      <form class="creationPatient__form" @submit.prevent="pushNewPatient">
        <label class="form_title" for="form__title"> Info</label>
        <input
          type="text"
          name="age"
          placeholder="Age"
          class="creationPatient__form form-control"
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          class="creationPatient__form form-control"
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          class="creationPatient__form form-control"
        />

        <label
          class="creationPatient__label creationPatient--text"
          for="message"
          >Information Patient:</label
        >
        <div class="message__container">
          <textarea
            class="creationPatient__message creationPatient--text"
            id="message"
            name="info"
          ></textarea>
        </div>

        <label
          class="creationPatient__label creationPatient--text"
          for="message"
          >Détail Pathologie:</label
        >
        <div class="message__container">
          <textarea
            class="creationPatient__message creationPatient--text"
            id="message"
            name="patho"
          ></textarea>
        </div>

        <label
          class="creationPatient__label creationPatient--text"
          for="message"
          >Bilan dernier Rendez-vous:</label
        >
        <div class="message__container">
          <textarea
            class="creationPatient__message creationPatient--text"
            id="message"
            name="bilan"
          ></textarea>
        </div>
        <input type="submit" value="Envoyer le formulaire" />
      </form>
    </div>
  </section>
</template>

<script>
import { PatientConverter, Patient } from "../model/Patient";
import { db } from "../main.js";
export default {
  name: "PageCreationPatient",
  methods: {
    pushNewPatient(submitEvent) {
      try {
        db.collection("patient")
          .withConverter(PatientConverter)
          .add(
            new Patient(
              42,
              submitEvent.target.elements.prenom.value,
              submitEvent.target.elements.nom.value,
              submitEvent.target.elements.age.value,
              submitEvent.target.elements.info.value,
              submitEvent.target.elements.patho.value,
              submitEvent.target.elements.bilan.value
            )
          );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="css">
.creationPatient__container {
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.creationPatient__form {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.creationPatient__form .form-control {
  margin-top: 25px;
  padding: 25px;
  border-radius: 10px;
  width: 500px;
  height: 50px;
}

.message__container {
  display: flex;
  width: 500px;
  height: 200px;
}

.creationPatient--text {
  font-size: 13pt;
  letter-spacing: 1px;
}

.creationPatient__label {
  padding: 10px;
}
.creationPatient__message {
  padding: 50px;
  margin-bottom: 20px;
  width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
  resize: none;
}

@media only screen and (max-width: 1400px) {
  .message__container {
    width: 600px;
  }

  .creationPatient__form .form-control {
    width: 600px;
  }
}

@media only screen and (max-width: 900px) {
  .message__container {
    width: 500px;
  }
  .creationPatient__form .form-control {
    width: 500px;
  }
}

@media only screen and (max-width: 599px) {
  .message__container {
    width: 350px;
  }

  .creationPatient__form .form-control {
    width: 350px;
  }
}
</style>
