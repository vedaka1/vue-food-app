<template>
    <div class="main-page">
        <div class="nav-header">
            NARFood
        </div>
        <div class="login">
            <input class="font" type="text" placeholder="login" name="login" id="login" v-model="login">
            <span class="error" id="email-error">Введите действительный адрес</span>
            <input class="font" type="text" placeholder="email" name="email" id="email" v-model="email">
            <span class="error" id="pass-error">Пароль должен содержать не менее 7 символов</span>
            <input class="font" type="password" placeholder="password" name="password" id="password" v-model="password">
            <button class="btn" name="register" id="register" @click="register">Зарегистрироваться</button>
            <RouterLink to="/SignInPage">
                Назад
            </RouterLink>
        </div>
  </div>
</template>

<style scoped>
.main-page {
    padding-left: 10px;
    padding-right: 10px;
}
.font{
  font-size: 0.9em;
}
.nav-header {
  text-align: center;
  font-size: 1.3em;
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
a {
    width: 100% ;
    text-decoration: none;
    color: gray;
    padding-top: 20px;
    text-align: center;
}
.error {
    display: none;
    font-size: 0.8rem;
    margin-left: 0px;
    width: 100%;
    color: gray;
    animation: 0.5s show ease;
    padding-bottom: 3px;
}
@keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
}

</style>

<script setup>
import { onMounted, ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, setDoc, doc} from "firebase/firestore"
import { useRouter } from "vue-router";

const login = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const db = getFirestore();
const userRef = collection(db, "users")

onMounted(() =>{
    const login_field = document.getElementById('login')
    const email_field = document.getElementById('email')
    const password_field = document.getElementById('password')

    login_field.addEventListener("input", () => {
            if (login_field.value.length <= 1) {
                login_field.style.border = '1px solid rgba(255, 0, 0, 0.5)';
            } else {
                login_field.style.border = '1px solid rgba(0, 0, 0, 0.1)';
            }
        })
    email_field.addEventListener("input", () => {
        if (!email_field.value.includes('@')) {
            email_field.style.border = '1px solid rgba(255, 0, 0, 0.5)';
            document.getElementById('email-error').style.display = 'block';
        } else {
            email_field.style.border = '1px solid rgba(0, 0, 0, 0.1)';
            document.getElementById('email-error').style.display = 'none';
        }
    })
    password_field.addEventListener("input", () => {
            if (password_field.value.length <= 6) {
                password_field.style.border = '1px solid rgba(255, 0, 0, 0.5)';
                document.getElementById('pass-error').style.display = 'block';
            } else {
                password_field.style.border = '1px solid rgba(0, 0, 0, 0.1)';
                document.getElementById('pass-error').style.display = 'none';
            }
        })
})

const register = () => {
    if (password.value.length <= 6) {
        document.getElementById('password').style.border = '1px solid rgba(255, 0, 0, 0.5)'
    } else {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((cred) => {
            setDoc(
                doc(userRef, cred.user.uid), 
                {
                    login: login.value
                });
            router.push("/")
        })
    }       
}
</script>
