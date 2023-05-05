<template>
    <div class="main-page">
        <TopBar/>
        <div class="head-text" alt>{{name}}</div>
        <div class="items" v-for="item in items" :key="item.id">
            <div class="item">{{ item.name }} {{ item.price }} ₽</div>
        </div>
        <BottomBar/>
    </div>
</template>

<style scoped>

.main-page {
    width: 100vw;
    height: 86vh;
    margin-top: 7vh;
    margin-bottom: 7vh;
}

.head-text {
    margin-top: 10px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 40px;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 100;
    margin-top: 7vh;
}

</style>

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
        dialog: false,
        };
    },
}
</script>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc, getDocs, getFirestore, collection } from "firebase/firestore";
import { useRouter } from "vue-router";
// import { getAuth } from "firebase/auth";

// const router = useRouter();
const id = useRouter().currentRoute.value.params.id;
const db = getFirestore();
const name = ref()
const items = ref([])

onMounted(async () => {  
    const cardIdRef = doc(db, 'buildings', id);
    let fbcard = await getDoc(cardIdRef);
    name.value = fbcard.data().name;

    const querySnapshot = await getDocs((collection(db, `buildings`, id, 'menu')));
    const fbMenu = [];
    querySnapshot.forEach((doc) => {
        fbMenu.push({ id: doc.id, ...doc.data() });
        });  
    items.value = fbMenu;
});

</script>