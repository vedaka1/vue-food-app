<template>
    <div>
        <TopBar/>
        <div class="main-page">
            <div class="user-info">
                Тут будут ваши данные
            </div>
            <button class="btn" @click="handleSignOut">Выйти</button>
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

