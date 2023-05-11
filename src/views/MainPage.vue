<template>
    <div class="main-page">
        <TopBar/>
        <div class="head-text">Доступные меню:</div>
        <div class="cards">
            <div class="card" v-for="card in cards" :key="card.id">
                <RouterLink :to="{name: 'menu', params: {id: card.id}}">
                    <button class="card-item" v-bind:style="{backgroundImage: 'url('+card.img_url+')'}">
                            <p>
                                {{ card.name }}<br>
                                {{ card.address }}
                            </p>
                    </button>
                </RouterLink>
            </div> 
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
.cards {
    width: 100%;
    overflow: scroll;
    padding: 10px;
    border-radius: 15px;
    column-count: 2;
    gap: 10px;
}

a {
    height: 100%;
    width: 100%;
    text-decoration: none;
    border: none;
}

.card {
    height: 28vh;
    /* min-width: 40vw; */
    margin-bottom: 10px;
    animation: 0.5s show ease;
}
@keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
}

a .card-item {
    width: 100%;
    height: 100%;
    background-color: white;
    border: none;
    border-radius: 15px;
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-size: 200%;
    background-attachment: local;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow: hidden;
}
p {
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    width: 100%;
    padding: 5px;
    color: black;
    font-size: 0.8rem;
    border: none;
}

a:last-child {
    margin-bottom: 10vh;
}

</style>

<script>
// Navigation bars import
import BottomBar from "../components/BottomNavigation.vue";
import TopBar from "../components/TopNavigation.vue"

export default {
    name: 'navigation-bars',
    components: {
        BottomBar,
        TopBar
    },
}
</script>

<script setup>
import { ref, onMounted} from 'vue';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref as storageRef , getDownloadURL } from "firebase/storage";
// Connect database to load cards
const db = getFirestore();
const cards = ref([]);
const storage = getStorage();
onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, `buildings`));
    const fbCards = [];
    querySnapshot.forEach((doc) => {
        fbCards.push({ id: doc.id, ...doc.data() });
        });
    for (let x in fbCards) {
        fbCards[x].img_url = await getDownloadURL(storageRef(storage, fbCards[x].img_url))
        .catch((error) => {console.log('URL Download ERROR')});
        }
    cards.value = fbCards;
});
</script>
