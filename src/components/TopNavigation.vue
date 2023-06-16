<template>
    <div class="top-bar">
        <h2>Столовка</h2>
        <RouterLink to="/ProfilePage">
            {{ account.login }}
            <button class="btn-top-nav">
                <img class="icon" src="../icons/user.png" alt="+">
            </button>
        </RouterLink>
    </div>
</template>

<style scoped>
.top-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 7vh;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    color: black;
    font-size: 1rem;
    align-items: center;
    padding: 10px;
    border-bottom: 0.7px solid lightgray;
    background: var(--navigation-color);
    backdrop-filter: blur(15px);
    z-index: 1;
}

.icon {
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    align-self: center;
    margin-bottom: 5px;
    user-select: none;
}

.btn-top-nav {
    border-radius: 50%;
    background-color: rgb(231, 231, 231);
    border: none;
    width: 40px;
    height: 40px; 
    margin-left: 10px;
}
a {
    display: flex;
    align-items: center;
    color: gray;
    text-decoration: none;
    background-color: none;
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

<script>
export default {
    props: {
        login: String
    }
}
</script>
<script setup>
import {getDoc, doc, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {ref, onMounted} from "vue";

const account = ref([]);
const db = getFirestore();
const user = getAuth().currentUser.uid;

onMounted(async () => {
    const userRef = await getDoc(doc(db, 'users', user));
    account.value = userRef.data();
})   
</script>