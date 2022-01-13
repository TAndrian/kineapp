<template>
  <article class="modal">
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div
          class="modal"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
        >
          <header class="modal-header" id="modalTitle">
            <slot name="header"> This is the default title! </slot>
            <button type="button" class="btn-close" @click="close">
              <Icon icon="times" />
            </button>
          </header>

          <section class="modal-body" id="modalDescription">
            <slot name="body"> </slot>
          </section>

          <footer class="modal-footer">
            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              Fermer
            </button>
          </footer>
        </div>
      </div>
    </transition>
  </article>
</template>

<script>
export default {
  name: "Modal",
  components: {},
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="css">
.modal-backdrop {
  position: fixed;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 80%;
  height: 80vh;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  background-color: #e30044;
  font-size: 15pt;
  display: inline-flex;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #f7f7f7;
  justify-content: center;
}

.modal-body {
  display: inline-flex;
  column-gap: 15px;
  padding: 20px 10px;
}

.separator3 {
  width: 20%;
  height: 5px;
  background: #e30044;
}

.gauche {
  box-shadow: 0px 0px 10px rgb(200, 200, 200);
  width: 60%;
  height: 55vh;
}

.droite {
  box-shadow: 0px 0px 10px rgb(200, 200, 200);
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 40%;
  height: 55vh;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 25px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
  background: transparent;
}

.modal-footer {
  margin-top: auto;
  border-top: 1px solid #eeeeee;
  align-items: baseline;
  justify-content: center;
}

.btn-green {
  border: none;
  color: white;
  font-size: 12pt;
  width: 100px;
  padding: 10px;
  background: #e30044;
  border-radius: 10px;
  cursor: pointer;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.title2 {
  color: black;
  font-size: 13pt;
}
</style>
