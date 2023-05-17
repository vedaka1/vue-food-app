<template>
    <div class="main">
        <div class="nav-header">
            Столовка Сафу
        </div>
        <div class="login">
                <input class="font" type="text" placeholder="email" name="email" id="email" v-model="email">
                <input class="font" type="password" placeholder="password" name="password" id="password" v-model="password">
            <div class="btns">
                <button class="btn" name="login" id="login" @click="signIn">Войти</button>
                <RouterLink to='/RegisterPage' name="register" id="register">
                    Зарегистрироваться
                </RouterLink>
            </div>
        </div>
    </div> 
</template>

<style scoped>

.font{
  font-size: 0.9em;
}
.nav-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: white;
  border-radius: 15px;
  background-color: rgb(0, 0, 0);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

.main {
  padding: 10px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  font-weight: 400;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20vh;
  font-family: 'Roboto', sans-serif;
}

input {
  padding: 10px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 100%;
  font-size: 1em;
  height: 50px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

input:focus {
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: 0;
}

.login .btns {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
}

.btns .btn {
  font-size: 0.9em;
  width: 100%;
  height: 50px;
  border-radius: 15px;
  margin: 10px 0 0 0;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(0, 0, 0);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}
.login a {
    text-align: center;
    text-decoration: none;
    color: gray;
}
.btn:hover {
  background-color: rgb(59, 59, 59);
}

.btn:active {
  background-color: rgb(119, 119, 119);
}

a:active,
a:hover,
a::after {
    text-decoration: none;
    background-color: none;
    color: none;
    -webkit-tap-highlight-color: transparent;
}

</style>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithRedirect,
} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      alert(error.message);
    });
};
</script>