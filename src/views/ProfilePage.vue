<template>
    <div>
        <div class="profile-page">
            <div class="user-info">
                <div>login: {{ account.login }}</div>
            </div>
            <button class="btn" @click="handleSignOut">Выйти</button>
        </div>
    </div>
</template>

<style scoped>
.profile-page {
    padding: 10px;
    width: 100vw;
}
.user-info {
    margin-top: 7vh;
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

