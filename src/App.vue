<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue"

const auth = getAuth();
const account = ref("");
const pwd = ref("");


function loginOrCreate() {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.alert("Login Successed"):
        window.alert(user):
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Login Failed")
        window.alert(errorCode + ": " + errorMessage)
    });
}
</script>

<template>
  <header>
    <div>
      <label for="Account">Account:</label>
      <input type="text" v-model="account">
    </div>
    <div>
      <label for="Password">Password:</label>
      <input type="text" v-model="pwd">
    </div>
    <div>
      <button @click="loginOrCreate">Log In</button>
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

div {
    display: inline-block;
}

div label {
    display: block;
}
</style>
