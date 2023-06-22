<template>
    <div class="main-page">
        <div class="container">
            <div class="head-text" v-bind:style="{backgroundImage: 'url('+img_main+')'}">
                <div class="info name">{{card.name}}</div>
                <div class="info hours"> с {{hours[0]}} до {{hours[1]}}</div>
                <div class="info address">{{card.address}}</div>
            </div>
        </div>
        <div class="container" v-for="title in Object.keys(items)" :key="title">
            <p>{{ title }}</p>
            <div class="cards">
                <div class="card" v-for="item in items[title]" :key="item.id">    
                    <div class="card-items">
                        <RouterLink :to="{name: 'food', params: {id: id, food_id: item.id}}">
                            <img :src="item.img_url" class="card-img" loading="lazy">
                        </RouterLink>
                        <div class="card-info">
                            <div class="card-name">
                                <span>{{ item.name }}</span> <span class="food-rate">{{ item.rate }} &starf;</span>
                            </div>
                            <div class="card-price">
                                <div>
                                {{ item.price }} ₽
                                </div>
                                <div class="buttons">
                                    <button v-if="item.count != 0" class="btn-menu" id="deleteItem" @click="deleteItem(item)">
                                        &minus;
                                    </button>
                                    <div v-if="item.count != 0" class="item-counter">{{ item.count }}</div>
                                    <button class="btn-menu" id="addItem" @click="addItem(item)">&plus;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
    scrollbar-width: none;
}
.head-text {
    height: 150px;
    width: 100%;
    max-width: 800px;
    margin-top: 50px;
    margin-bottom: 10px;
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
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow: hidden;
}
p {
    font-size: 1.3rem;
    text-align: center;
}

.info {
    border-radius: 15px;
    background-color: var(--navigation-color);
    backdrop-filter: blur(10px);
    padding: 5px;
    font-size: 0.6em;
}

a {
    flex-basis: 80%;
    width: 100%;
    text-decoration: none;
    border: none; 
    border-radius: 15px;
    overflow: hidden;
}
a:active,
a:hover,
a::after {
    text-decoration: none;
    background-color: none;
    color: none;
    -webkit-tap-highlight-color: transparent;
}

.cards {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.card {
    height: 230px;
    width: 48%;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: 0.5s show ease;
}
@keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
}
.card-name {
    width: 100%;
    font-size: 1em;
}
.card-price {
    align-items: center;
    font-size: 1.1em;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.card-items {
    height: 100%;
    background-color: var(--items-color);
    border: none;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow: hidden;
}
.card-info {
    flex-basis: 25%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8em;
}
a .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
}
.food-rate {
    color: rgb(255, 168, 54);
}
.item-counter {
    width: 20px;
    text-align: center;
}
.btn-menu {
    max-width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    outline: 0;
    border: none;
    font-size: 1.3em;
    flex-grow: 1;
    color: var(--text-color);
    background-color: var(--btn-second-color);
}

.btn-menu:active {
    background-color: #d1d1d1;
}

.buttons {
    height: 100%;
    min-width: 70%;
    width: fit-content;
    display: flex;
    justify-content: flex-end;
    column-gap: 5px;
    align-items: center;
}
.blur-load {
    width: 100%;
    height: 100%;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage, ref as storageRef  , getDownloadURL } from "firebase/storage";
// import { getAuth } from "firebase/auth";

const id = useRouter().currentRoute.value.params.id;
const db = getFirestore();
const items = ref([]);
const storage = getStorage();
const card = ref([]);
let img_main = '';
let hours = [];

onMounted(async () => {  
    const cardIdRef = await getDoc(doc(db, 'buildings', id));
    card.value = cardIdRef.data();
    img_main = await getDownloadURL(storageRef(storage, card.value.img_url))
    .catch((error) => {console.log(error.message)});
    hours = card.value.working_hours;
    const querySnapshotMenu = await getDocs(collection(db, `buildings`, id, 'menu'));
    const fbMenu = {};
    querySnapshotMenu.forEach((doc) => {
        let item_count = 0;
        if (doc.id in localStorage) {
            let localItem = JSON.parse(localStorage.getItem(doc.id));
            item_count = localItem['count']
        } else {
            item_count = 0;
        }
        if (doc.data().type in fbMenu) {
            fbMenu[doc.data().type].push({ id: doc.id, ...doc.data(), count: item_count });
        } else {
            fbMenu[doc.data().type] = [{ id: doc.id, ...doc.data(), count: item_count }]; 
        }
        });
                 
    try {
        for (let x in fbMenu) {
            for (let y in fbMenu[x]) {
                if (fbMenu[x][y].img_url != "") {
                    fbMenu[x][y].img_url = await getDownloadURL(storageRef(storage, fbMenu[x][y].img_url))
                } else {
                    fbMenu[x][y].img_url = await getDownloadURL(
                        storageRef(storage, 'gs://stolovka-app.appspot.com/stolovka-images/not-found.png')
                        )
                }  
            }
    } 
    } catch (error) {
        console.log(error.message)
    }
    items.value = fbMenu;
});
const addItem = (item) => {
    item.count++;
    localStorage.setItem(item.id, JSON.stringify(item));
};

const deleteItem = (item) => {
    if (item.count > 0) {
        item.count--;
        localStorage.setItem(item.id, JSON.stringify({count: item.count, build: id}));
    }
    if (item.count == 0) {
        localStorage.removeItem(item.id);
    }
}
</script>