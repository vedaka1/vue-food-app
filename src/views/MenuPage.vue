<template>
    <div class="main-page">
        <div class="head-text" v-bind:style="{backgroundImage: 'url('+img_main+')'}">
            <div class="info name">{{card.name}}</div>
            <div class="info hours"> с {{hours[0]}} до {{hours[1]}}</div>
            <div class="info address">{{card.address}}</div>
        </div>
        <div v-for="title in Object.keys(items)" :key="title">
            <p>{{ title }}</p>
            <div class="cards">
                <div class="card" v-for="item in items[title]" :key="item.id">    
                    <div class="card-items">
                        <RouterLink :to="{name: 'food', params: {id: id, food_id: item.id}}">
                            <img :src="item.img_url" class="card-img">
                        </RouterLink>
                        <div class="card-info">
                            <div class="card-name">
                                <div>
                                    {{ item.name }}<br>
                                    {{ item.price }} ₽
                                </div>
                            </div>
                            <div class="buttons">
                                <button class="btn" id="addItem" @click="addItem">&plus;</button>
                                <button class="btn" id="deleteItem" @click="deleteItem">&minus;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    margin-bottom: 7vh;
}

.head-text {
    height: 20vh;
    margin-top: 7vh;
    margin-left: 10px;
    margin-right: 10px;
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
    padding-left: 10px;
    font-size: 1.3rem;
}

.info {
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.7);
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
    height: 30vh;
    width: 100%;
    padding: 10px 10px 10px 0;
    border-radius: 15px;
    column-count: 2;
    column-gap: 10px;
    padding: 10px;
}

.card {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    animation: 0.5s show ease;
}
@keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
}
.card-name {
    height: 100%;
    color: black;
    width: auto;
    font-size: 3.6vw;
    padding-right: 5px;
}
.card-items {
    height: 100%;
    background-color: white;
    border: none;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow: hidden;
}
.card-info {
    flex-basis: 20%;
    padding: 5px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;

}
a .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
}

.btn {
    width: 100%;
    max-width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    /* outline: 0; */
    border: none;
    font-size: 1.3em;
}

.btn:active {
    background-color: #d1d1d1;
}

.buttons {
    height: 100%;
    width: 40%;
    display: flex;
    justify-content: end;
    column-gap: 5px;
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
    hours = card.value.working_hours
    
    const querySnapshotMenu = await getDocs(collection(db, `buildings`, id, 'menu'));
    const fbMenu = {};
    querySnapshotMenu.forEach((doc) => {
        if (doc.data().type in fbMenu) {
            fbMenu[doc.data().type].push({ id: doc.id, ...doc.data() })
        } else {
            fbMenu[doc.data().type] = [{ id: doc.id, ...doc.data() }];  
        }});
             
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

</script>