<template>
    <div>
        <TopBar/>
        <div class="main-page">Тут будут ваши данные 
            <button @click="handleSignOut">Выйти</button>
        </div>
        <BottomBar/>
    </div>
</template>

<script>
    import BottomBar from "../components/BottomNavigation.vue";
    import TopBar from "../components/TopNavigation.vue"
    export default {
        name: 'bar-ba',
        components: {
            BottomBar,
            TopBar
        },
        data() {
        return {
            dialog: false
        };
    },
    }
</script>

<style scoped>

.main-page {
    width: 100vw;
    height: 83vh;
    margin-top: 7vh;
    margin-bottom: 10vh;
    text-align: center; 
}

</style>

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
let auth = getAuth();
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

