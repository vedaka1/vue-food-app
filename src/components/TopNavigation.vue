<template>
    <div class="top-bar">
        <div class="container">
            <h2>NARFood</h2>
            <RouterLink to="/ProfilePage">
                <p>{{ account.login }}</p>
                <button class="btn-top-nav">
                    <img class="icon" src="../icons/user.png" alt="+">
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.top-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    font-size: 1rem;
    align-items: center;
    padding: 10px;
    background: var(--navigation-color);
    backdrop-filter: blur(15px);
    z-index: 1;
}
.container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 800px;
}
.icon {
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    align-self: center;
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
h2 {
    color: var(--text-color);
}
p {
    color: var(--text-second-color);
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