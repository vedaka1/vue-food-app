<template>
    <div class="main-page">
        <TopBar/>
        <div class="head-text" v-bind:style="{backgroundImage: 'url('+img_url+')'}">
            <div class="info name">{{card.name}}</div>
            <div class="info hours"> с {{hours[0]}} до {{hours[1]}}</div>
            <div class="info address">{{card.address}}</div>
        </div>
        <p>Супы</p>
        <div class="cards">
            <div class="card" v-for="item in items" :key="item.id">     
                <div class="card-items">
                    <RouterLink to="/">
                        <img src="https://i0.wp.com/fartyk.ru/wp-content/uploads/2020/04/red-borsh.png" class="card-img">
                    </RouterLink>
                    <div class="card-info">
                        <div>
                            <div class="card-name">{{ item.name }}</div>
                            <div class="card-price">{{ item.price }} ₽</div>
                        </div>
                        <div class="buttons">
                            <button class="btn">&plus;</button>
                            <button class="btn">&ndash;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BottomBar/>
    </div>
</template>

<style scoped>

.main-page {
    padding-top: 10px;
    width: 100vw;
    height: 86vh;
    margin-bottom: 7vh;
    display: flex;
    flex-direction: column;
}

.head-text {
    height: 20vh;
    margin-top: 7vh;
    margin-left: 10px;
    margin-right: 10px;
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
p {
    padding-left: 10px;
    /* text-align: center; */
}

.info {
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 5px;
    font-size: 0.6em;
}

a {
    height: 100%;
    width: 100%;
    text-decoration: none;
    border: none;
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
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow: scroll;
    padding: 10px 10px 10px 0;
    border-radius: 15px;
    flex-grow: 1;
    padding: 10px;
    column-gap: 10px;
}

.card {
    height: fit-content;
    /* min-width: 40vw; */
    flex-basis: 50%;
}

.card-name {
    color: black;
}
.card-items {
    /* width: 100%;
    height: 100%; */
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
    padding: 5px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;

}
.card-img {
    width: 100%;
    height: 70%;
    border-radius: 15px;
    object-fit: contain;
}

.btn {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    /* outline: 0; */
    border: none;
    font-size: 1.3em;
}

.buttons {
    display: flex;
    column-gap: 5px;
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