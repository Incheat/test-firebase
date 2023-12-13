<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue"

const auth = getAuth();
const account = ref("");
const pwd = ref("");


function login() {
  const email = account.value;
  const password = pwd.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.alert("Login Successed");
        window.alert(getUserData(user));
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Login Failed");
        window.alert(errorCode + ": " + errorMessage);
    });
}

function create() {
  const email = account.value;
  const password = pwd.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        window.alert("Create Successed");
        window.alert(getUserData(user));
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Create Failed");
        window.alert(errorCode + ": " + errorMessage);
    });
}

function showCurrentUserData() {
  const user = auth.currentUser;
  window.alert(getUserData(user));
}

function getUserData(user){
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
    return `DisplayName: {displayName}\n Email: {email}\n PhotoURL: {photoURL}\n EmailVerified: {emailVerified}\n Uid: {uid}\n`;
  }
  return "no user";
}
</script>

<template>
  <header>
    <table>
      <tr>
        <td>EMAIL</td>
        <td>PASSWORD</td>
      </tr>
      <tr>
        <td><input type="text" v-model="account"></td>
        <td><input type="text" v-model="pwd"></td>
      </tr>
      <tr>
        <button @click="login">Sign In</button>
        <button @click="create">Sign Up</button>
        <button @click="showCurrentUserData">Show Current User Data</button>
      </tr>
    </table>
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
</style>
