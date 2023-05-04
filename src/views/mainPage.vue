<template>
    <div class="main-page">
        <TopBar/>
        <div class="head-text">Доступные меню:</div>
        <div class="carousel">
            <div class="card" v-for="card in cards" :key="card.id">
                <RouterLink to="/">
                    <button class="item">
                        {{ card.name }}<br>
                        {{ card.address }}
                        <img url="{{ card.img_url }}">
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
    height: 83vh;
    /* margin-top: 7vh; */
    margin-bottom: 10vh;
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
    /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3); */
}

.carousel {
    display: flex;
    flex-direction: row;
    /* flex-grow: 1; */
    /* height: 60vh; */
    width: 100%;
    /* height: 93vh; */
    /* margin-top: 7vh; */
    /* padding-bottom: 10vh; */
    /* max-height: 50vw; */
    overflow: scroll;
    padding: 10px 10px 10px 0;
    border-radius: 15px;
    flex-wrap: wrap;
    flex-grow: 1;
}

a {
    height: 100%;
    width: 100%;
    text-decoration: none;
}

.card {
    padding-left: 10px;
    padding-top: 10px;
    height: 30vh;
    /* min-width: 40vw; */
    flex-basis: 50%;
}

a .item {
    width: 100%;
    height: 100%;
    background-color: white;
    border: none;
    border-radius: 15px;
    background-image: url('../icons/main-build.jpg');
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-size: 250%;
    background-attachment: local;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 5px;
    font-size: 0.7rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}
a:last-child {
    margin-bottom: 10vh;
}
@media (min-width: 1000px) {
    .carousel {
        height: 25vh;
    }

    a {
        width: 20vw;
        height: 100%;
    }
}
</style>

<script>
// Navigation bars import
import BottomBar from "../components/BottomNavigation.vue";
import TopBar from "../components/TopNavigation.vue"
export default {
    name: 'bar-ba',
    components: {
        BottomBar,
        TopBar
    }
}
</script>

<script setup>
// Connect to database to load cards
import { ref, onMounted} from 'vue';
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore();
const cards = ref([]);
onMounted(async () => {
    const querySnapshot = await getDocs((collection(db, `buildings`)));
    const fbCards = [];
    querySnapshot.forEach((doc) => {
        fbCards.push({ id: doc.id, ...doc.data() });
        cards.value = fbCards;
  });
});
</script>