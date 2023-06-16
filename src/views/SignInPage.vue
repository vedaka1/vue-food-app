<template>
    <div class="main-page">
        <div class="nav-header">
            Столовка Сафу
        </div>
        <div class="login">
                <input class="font" type="text" placeholder="email" name="email" id="email" v-model="email">
                <input class="font" type="password" placeholder="password" name="password" id="password" v-model="password">
                <button class="btn" name="login" id="login" @click="signIn">Войти</button>
                <RouterLink to='/RegisterPage' name="register" id="register">
                    <p>Зарегистрироваться</p>
                </RouterLink>
                    
                </div>
            </div> 
        </template>

<style scoped>

.font{
  font-size: 0.9em;
}
.nav-header {
  text-align: center;
  font-size: 1.3em;
}
h2 {
  font-weight: 400;
}
p {
    margin-top: 20px;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-top: 25vh;
  font-family: 'Roboto', sans-serif;
}

input {
  padding: 10px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  width: 100%;
  font-size: 1em;
  height: 50px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

input:focus {
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: 0;
}
.login a {
    text-align: center;
    text-decoration: none;
    color: gray;
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