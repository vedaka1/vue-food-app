<template>
    <div>
        <div class="main-page">
            <div class="user-info">
                <div>логин: {{ account.login }}</div>
            </div>
            <button class="btn" @click="handleSignOut">Выйти</button>
        </div>
    </div>
</template>

<style scoped>

.main-page {
    width: 100vw;
    height: 83vh;
    margin-top: 7vh;
    margin-bottom: 10vh;
    text-align: center; 
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.btn {
  font-size: 0.9em;
  width: 50%;
  height: 50px;
  border-radius: 15px;
  margin: 10px 0 0 0;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(0, 0, 0);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}
.user-info {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 10px;
    width: 100%;
    display: flex;
    color: gray;
    flex-direction: column;
}

</style>

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const db = getFirestore()
const account = ref([])
const user = getAuth().currentUser.uid;
const router = useRouter();

onMounted(async () => {
    const userRef = await getDoc(doc(db, 'users', user));
    account.value = userRef.data();
})

let auth = getAuth();
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

