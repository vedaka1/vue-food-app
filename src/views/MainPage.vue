<template>
    <div class="main-page">
        <div class="head-text">Доступные меню:</div>
        <div class="cards">
            <div class="card" v-for="card in cards" :key="card.id">
                <RouterLink :to="{name: 'menu', params: {id: card.id}}">
                    <button class="card-item">
                        <img class="card-img" :src="card.img_url" alt="Здание">
                        <p>
                            {{ card.name }}<br>
                            {{ card.address }}
                        </p>
                    </button>
                </RouterLink>
            </div> 
        </div>
    </div>
</template>

<style scoped>
.head-text {
    /* margin-top: 10px; */
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 40px;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 100;
    margin-top: 50px;
}
.cards {
    width: 100%;
    padding-top: 10px;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

a {
    height: 100%;
    width: 100%;
    text-decoration: none;
    border: none;
}

.card {
    display: flex;
    height: 200px;
    width: 300px;
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
    background-position: 50% 50%;
    background-size: cover;
    background-attachment: local;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow: hidden;
}
p {
    border-radius: 15px;
    width: 100%;
    padding: 5px;
    color: black;
    font-size: 1em;
    font-weight: 700;
    border: none;
    padding: 5px;
}

a:last-child {
    margin-bottom: 10vh;
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    overflow: hidden;
    border-radius: 15px;
}

</style>

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
        .catch((error) => {console.log(error.message)});
        }
    cards.value = fbCards;
});
</script>
