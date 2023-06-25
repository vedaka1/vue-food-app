<template>
    <div class="main-page">
        <div class="head-text">Доступные меню:</div>
        <div class="cards">
            <RouterLink to="/NewBuilding" v-if="user_role" >
                <div class="btn">Добавить</div>
            </RouterLink>
            <div class="card" v-for="card in cards" :key="card.id" :id="card.id">
                <button v-if="user_role" class="btn delete-card-btn" @click="deleteBuilding(card)">Удалить</button>
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
    display: flex;
    justify-content: center;
}

.card {
    display: flex;
    height: 200px;
    width: 300px;
    margin-bottom: 10px;
    position: relative;
    
}

a .card-item {
    width: 100%;
    height: 100%;
    background-color: var(--items-color);
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
    color: var(--text-color);
    font-size: 1em;
    font-weight: 700;
    border: none;
    padding: 5px;
}

a:last-child {
    margin-bottom: 10vh;
}
a:active,
a:hover,
a::after {
    text-decoration: none;
    background-color: none;
    color: none;
    -webkit-tap-highlight-color: transparent;
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    overflow: hidden;
    border-radius: 15px;
}
.btn {
    max-width: 300px;
    margin-top: 0;
}
.delete-card-btn {
    position: absolute;
    color: white;
    top: 5px;
    height: 30px;
    background-color: #ff3b3b;
    padding: 10px;
    width: fit-content;
    left: 5px;
}
</style>
<script setup>
import { ref, onMounted} from 'vue';
import { getFirestore, collection, getDocs, deleteDoc, doc, query, where} from "firebase/firestore";
import { getStorage, ref as storageRef , getDownloadURL, deleteObject } from "firebase/storage";
import { getRole } from '@/user';
import { auth } from '@/main';

// Connect database to load cards
const db = getFirestore();
const cards = ref([]);
const storage = getStorage();
const user = auth.currentUser.uid;
let user_role;

onMounted(async () => {
    user_role = await getRole(user);
    if (localStorage.getItem(user) === null) {
        localStorage.setItem(user, JSON.stringify({basket: {}, settings: {user_role}}))
    }
    const querySnapshot = await getDocs(collection(db, `buildings`));
    const fbCards = [];
    querySnapshot.forEach((doc) => {
        fbCards.push({ id: doc.id, ...doc.data() });
        });
    for (let x in fbCards) {
        fbCards[x].img_url = await getDownloadURL(storageRef(storage, fbCards[x].img_url))
        .catch((error) => {console.log(error.message)});
        fbCards[x].img_name = (storageRef(storage, fbCards[x].img_url)).fullPath;
        }
    cards.value = fbCards;
});

const deleteBuilding = async (card) => {
    if (user_role == 'admin') {
        const querySnapshot = await getDocs(query(collection(db, 'reviews'), where('building', '==', card.id)));
        let review_list = [];
        querySnapshot.forEach((doc) => {
            review_list.push({id: doc.id});
        });
        review_list.forEach( async (doc_item) => {
            await deleteDoc(doc(db, 'reviews', doc_item.id))
        });
        const menuSnapshot = await getDocs(query(collection(db, 'buildings', card.id, 'menu')));
        let menu_list = [];
        menuSnapshot.forEach((doc) => {
            menu_list.push({id: doc.id});
        });
        menu_list.forEach( async (doc_item) => {
            await deleteDoc(doc(db, 'buildings', card.id, 'menu', doc_item.id));
        });
        await deleteDoc(doc(db, 'buildings', card.id));
        document.getElementById(card.id).classList.add('visible');
        setTimeout(() => {
            document.getElementById(card.id).style.display = 'none';
        }, 1000);
        deleteObject(storageRef(storage, card.img_name ))
        .catch((error) => {
            console.log(error);
        });
    } else {
        console.log('Недостаточно прав!');
    }
}
</script>
