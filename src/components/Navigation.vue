<template>
  <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand">Kiné App</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/RDV" exact class="nav-item nav-link"
              >RDV</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/Patient" class="nav-item nav-link"
              >Patient</router-link
            >
          </li>
          <router-link to="/Exercice" class="nav-link">Exercie</router-link>

          <router-link to="/EDT" class="nav-link">EDT</router-link>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style>
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: crimson;
  border-radius: 0.5rem;
}

.navbar-brand {
  padding-right: 50px;
}

.nav-item {
  padding-right: 15px;
  transition: 0.2s ease;
}
</style>
