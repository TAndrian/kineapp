<template>
  <article class="patient">
    <ListPatient />
  </article>
</template>

<script>
import ListPatient from "../components/ListPatient.vue";
export default {
  name: "Patient",
  components: {
    ListPatient,
  },
};
</script>

<style></style>
