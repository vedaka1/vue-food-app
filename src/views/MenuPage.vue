<template>
    <div class="main-page">
        <TopBar/>
        <div class="head-text" v-bind:style="{backgroundImage: 'url('+img_url+')'}">
            <div class="info name">{{card.name}}</div>
            <div class="info hours"> с {{hours[0]}} до {{hours[1]}}</div>
            <div class="info address">{{card.address}}</div>
        </div>
        <div class="items" v-for="item in items" :key="item.id">
            <div class="item">{{ item.name }} {{ item.price }} ₽</div>
        </div>
        <BottomBar/>
    </div>
</template>

<style scoped>

.main-page {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100vw;
    height: 86vh;
    margin-bottom: 7vh;
    display: flex;
    flex-direction: column;
}

.head-text {
    height: 20vh;
    margin-top: 7vh;
    padding: 5px;
    gap: 5px;
    display: flex;
    align-items: flex-end;
    border-radius: 20px;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 100;
    background-repeat: no-repeat;
    background-position: 0% 30%;
    background-size: 100%;
    background-attachment: local;
    margin-bottom: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.info {
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 5px;
    font-size: 0.6em;
}

.item {
    padding-left: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    font-size: 0.8em;
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
            dialog: false
        };
    },
}
</script>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage, ref as storageRef , getDownloadURL } from "firebase/storage";
// import { getAuth } from "firebase/auth";

const id = useRouter().currentRoute.value.params.id;
const db = getFirestore();
const items = ref([]);
const storage = getStorage();
const card = ref([]);
let img_url = '';
let hours = [];

onMounted(async () => {  
    const cardIdRef = await getDoc(doc(db, 'buildings', id));
    let fbCard = [];
    card.value = cardIdRef.data();
    img_url = await getDownloadURL(storageRef(storage, card.value.img_url))
    .catch((error) => {console.log('URL Download ERROR')});
    hours = card.value.working_hours
    
    const querySnapshotMenu = await getDocs(collection(db, `buildings`, id, 'menu'));
    const fbMenu = [];
    querySnapshotMenu.forEach((doc) => {
        fbMenu.push({ id: doc.id, ...doc.data() });
        });  
    items.value = fbMenu;
});

</script>