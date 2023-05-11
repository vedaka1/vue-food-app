<template>
    <div class="main-page">
        <BottomBar/>
        <div class="head-text">
            <img class="card-img" src="https://i0.wp.com/fartyk.ru/wp-content/uploads/2020/04/red-borsh.png" alt="" >
            <div class="item-info">
                <p>{{ item.type }} {{ item.name }} {{ item.price }} ₽</p>
            </div>
        </div>
        <TopBar/>
    </div>
</template>

<style scoped>
.main-page {
    padding-top: 10px;
    width: 100vw;
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    overflow: scroll;
}

.head-text {
    height: 20vh;
    margin-top: 7vh;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    padding: 5px;
    gap: 5px;
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 100;
    background-repeat: no-repeat;
    background-position: 0% 30%;
    background-size: 100%;
    background-attachment: local;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.card-img {
    height: 100%;
    border-radius: 15px;
    object-fit: contain;
    overflow: hidden;
}
.item-info {
    height: 100%;
    flex-grow: 1;
    width: auto;
    display: flex;
    flex-direction: column;
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
import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { getStorage, ref as storageRef , getDownloadURL } from "firebase/storage";

const id = useRouter().currentRoute.value.params.id;
const food_id = useRouter().currentRoute.value.params.food_id;
const item = ref([]);
const db = getFirestore();
// const storage = getStorage();

onMounted(async () => {  
    const cardIdRef = await getDoc(doc(db, 'buildings', id, 'menu', food_id));
    let fbCard = [];
    item.value = cardIdRef.data();
    console.log(item.value)
    // img_url = await getDownloadURL(storageRef(storage, item.value.img_url))
    // .catch((error) => {console.log('URL Download ERROR')});

});
</script>