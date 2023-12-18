<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { getAuth, signInWithEmailLink, sendSignInLinkToEmail, verifyBeforeUpdateEmail, updateEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, checkActionCode, applyActionCode, signOut } from "firebase/auth";
import { ref } from "vue"

const auth = getAuth();
const account = ref("");
const pwd = ref("");
const oobCode = ref("");

function logout() {
  signOut(auth).then(() => {
    // Sign-out successful.
    window.alert("Logout Successed");
  }).catch((error) => {
    // An error happened.
    window.alert("Logout failed");
  });
}


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

function sendEmailVerify(){
  const user = auth.currentUser;
  const email = account.value;
  const actionCodeSettings = {
    url: `https://incheat.github.io/test-firebase?email=${email}`,
    handleCodeInApp: false
  };
  if (user !== null) {
    sendEmailVerification(user, actionCodeSettings)
      .then(() => {
        window.alert("Verification email sent");
        // Verification email sent.
      })
      .catch((error) => {
        window.alert("Email sent Failed");
      });
  }else {
    window.alert("No User, Email sent Failed");
  }
}

function sendSignInLink(){
  const email = account.value;
  const actionCodeSettings = {
    url: `https://incheat.github.io/test-firebase`,
    handleCodeInApp: true
  };
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.alert("SignInLink email sent");
      // Verification email sent.
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("sendSignInLink Error");
      window.alert(errorCode + ": " + errorMessage);
    });
}

//signInWithEmailLink
function loginWithSignInLink() {
  const email = account.value;
  signInWithEmailLink(auth, email, window.location.href)
    .then(() => {
      window.alert("loginWithSignInLink successed");
      // Verification email sent.
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("loginWithSignInLink Error");
      window.alert(errorCode + ": " + errorMessage);
    });
}

function showCurrentUserData() {
  const user = auth.currentUser;
  window.alert(getUserData(user));
}

function showRouteQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramsEmail = urlParams.get('email');
  window.alert(paramsEmail);
}

function getUserData(user: any){
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
    return `DisplayName: ${displayName}\n Email: ${email}\n PhotoURL: ${photoURL}\n EmailVerified: ${emailVerified}\n Uid: ${uid}\n`;
  }
  return "no user";
}

function applyAction(){
  const actionCode = oobCode.value;
  applyActionCode(auth, actionCode).then((resp) => {
      window.alert("Email address has been verified");
  }).catch((error) => {
      window.alert("Code is invalid or expired");
  });
}

function applyActionAndAutoLogin(){
  const actionCode = oobCode.value;
  applyActionCode(auth, actionCode).then((resp) => {
      window.alert("Email address has been verified");
      login();
  }).catch((error) => {
      window.alert("Code is invalid or expired");
  });
}

function reload() {
  const user = auth.currentUser;
  if (user !== null) {
    user.reload().then(() => {
      window.alert("Reloaded");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("Reloaded Error");
      window.alert(errorCode + ": " + errorMessage);
    });
  }else {
    window.alert("Error when reloading");
  }
}

function update() {
  const newEmail = account.value;
  const user = auth.currentUser;
  if (user !== null) {
    updateEmail(user, newEmail).then(() => {
      // Email updated!
      // ...
      window.alert("Email updated!");
    }).catch((error) => {
      // An error occurred
      // ...
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("Update Failed");
      window.alert(errorCode + ": " + errorMessage);
    });
  }else {
    window.alert("Error when Email updating");
  }
}

function sendUpdateEmail() {
  const newEmail = account.value;
  const user = auth.currentUser;
  if (user !== null) {
    verifyBeforeUpdateEmail(user, newEmail).then(() => {
      // Email updated!
      // ...
      window.alert("sendUpdateEmail sent!");
    }).catch((error) => {
      // An error occurred
      // ...
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("send UpdateEmail Failed");
      window.alert(errorCode + ": " + errorMessage);
    });
  }else {
    window.alert("Error when send update Email");
  }
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
        <button @click="loginWithSignInLink">Sign In with Sign In Link</button>
        <button @click="create">Sign Up</button>
        <button @click="logout">Sign Out</button>
        <button @click="update">Update Email</button>
        <button @click="reload">Reload</button>
      </tr>
      <tr>
        <td>-------------------------------</td>
      </tr>
      <tr>
        <button @click="showCurrentUserData">Show Current User Data</button>
        <button @click="showRouteQuery">Show Route Query</button>
      </tr>
      <tr>
        <td>-------------------------------</td>
      </tr>
      <tr>
        <td>oobCode</td>
      </tr>
      <tr>
        <td><input type="text" v-model="oobCode"></td>
      </tr>
      <tr>
        <button @click="sendEmailVerify">Send Email to Verify</button>
        <button @click="sendUpdateEmail">Send Email to Update</button>
        <button @click="sendSignInLink">Send Email to Sign In</button>
        <button @click="applyAction">Apply oobCode</button>
        <button @click="applyActionAndAutoLogin">Apply oobCode with relogin</button>
      </tr>
    </table>
  </header>

  <main></main>
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
