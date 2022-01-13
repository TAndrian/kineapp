<template>
  <section class="login-block">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <form class="md-float-material form-material">
            <div class="auth-box card">
              <div class="card-block">
                <div class="row">
                  <div class="col-md-12">
                    <h3 class="text-center heading">Créer un compte</h3>
                  </div>
                </div>

                <div class="form-group form-primary">
                  <input
                    type="text"
                    class="form-control"
                    name="email"
                    placeholder="Email"
                    v-model="email"
                  />
                </div>
                <div class="form-group form-primary">
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Mot de passe"
                    v-model="password"
                  />
                </div>

                <p class="text--error" v-if="isError">{{ errMsg }}</p>

                <div class="row">
                  <div class="col-md-12">
                    <button
                      @click="registerButtonPressed"
                      type="button"
                      class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                    >
                      S'inscrire
                    </button>
                  </div>
                </div>

                <br />
                <p class="text-inverse text-center">
                  Vous avez déjà un compte?

                  <router-link :to="{ name: 'Login' }"
                    >Se connecter</router-link
                  >
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Register",
  data() {
    return {
      isError: false,
      errMsg: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerButtonPressed() {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        // signout and redirect to login after the registration
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push("/Login");
          });
      } catch (error) {
        this.isError = true;
        switch (error.code) {
          case "auth/invalid-email":
            this.errMsg = "Invalid email";
            break;
          case "auth/user-not-found":
            this.errMsg = "No account with that email was found";
            break;
          case "auth/wrong-password":
            this.errMsg = "Incorrect password";
            break;
          case "auth/auth/account-exists-with-different-credential":
            this.errMsg = "email already in use";
            break;
          default:
            this.errMsg = "Email or password was incorrect";
            break;
        }
      }
    },

    async signInWithGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(token); // Token
          console.log(user); // User that was authenticated
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errMsg = "No account with that email was found";
              break;
            case "auth/wrong-password":
              this.errMsg = "Incorrect password";
              break;
            case "auth/auth/account-exists-with-different-credential":
              this.errMsg = "email already in use";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
              break;
          }
        });

      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/Login");
        });
    },
  },
};
</script>

<style lang="css">
.login-block {
  margin: 30px auto;
  min-height: 93.6vh;
}

.login-block .auth-box {
  margin: 20px auto 0;
  max-width: 450px !important;
}

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

.card .card-block {
  padding: 1.25rem;
}

.f-80 {
  font-size: 80px;
}

.form-group {
  margin-bottom: 1.25em;
}

.form-material .form-control {
  display: inline-block;
  height: 43px;
  width: 100%;
  border: none;
  border-radius: 0;
  font-size: 16px;
  font-weight: 400;
  padding: 9px;
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 1px solid #ccc;
}

.btn-md {
  padding: 10px 16px;
  font-size: 15px;
  line-height: 23px;
}

.btn-primary {
  background-color: #4099ff;
  border-color: #4099ff;
  color: #fff;
  cursor: pointer;
  -webkit-transition: all ease-in 0.3s;
  transition: all ease-in 0.3s;
}

.btn {
  border-radius: 2px;
  text-transform: capitalize;
  font-size: 15px;
  padding: 10px 19px;
  cursor: pointer;
}

.m-b-20 {
  margin-bottom: 20px;
}

.btn-md {
  padding: 10px 16px;
  font-size: 15px;
  line-height: 23px;
}

.heading {
  font-size: 21px;
}

#infoMessage p {
  color: red !important;
}

.btn-google {
  color: #545454;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 1px #ddd;
}

.or-container {
  align-items: center;
  color: #ccc;
  display: flex;
  margin: 25px 0;
}

.line-separator {
  background-color: #ccc;
  flex-grow: 5;
  height: 1px;
}

.or-label {
  flex-grow: 1;
  margin: 0 15px;
  text-align: center;
}
</style>
