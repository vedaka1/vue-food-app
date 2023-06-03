<template>
    <div class="main-page">
        <div class="header">
            Корзина:
        </div>
        <div class="cards" id="cards">
            <div v-for="item in items" :key="item.id" class="card" :id="item.id">
                <div class="info">
                    {{ item.name }} {{ item.price }} ₽ 
                </div> 
                <div class="card-buttons">
                    <button class="btn" id="addItem" @click="addItem(item)">&plus;</button>
                    {{ item.count }}
                    <button class="btn" id="deleteItem" @click="deleteItem(item)">
                        &minus;
                    </button>
                </div> 
            </div>       
        </div>
        <div class="footer">
            Сумма заказа: <br>
            {{ total_price }} ₽
            <div>
                <button @click="clearBasket">Очистить</button>
                <button>Заказать</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-page {
    padding-top: 10px;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    padding-top: 7vh;
    padding-bottom: 7vh;
}
.cards {
    padding: 10px;
}
.card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    animation: show 0.5s ease;
}
@keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
}
.header {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
.btn {
    max-width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    /* outline: 0; */
    border: none;
    font-size: 1.3em;
    flex-grow: 1;
}
.btn:active {
    background-color: #d1d1d1;
}

.card-buttons {
    height: 100%;
    min-width: 40%;
    width: fit-content;
    display: flex;
    justify-content: end;
    column-gap: 5px;
    align-items: center;
}
.footer {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 85vh;
}
.footer button {
    outline: 0;
    border: none;
    border-radius: 20px;
    padding: 10px;
    margin-left: 10px;
}

.footer button:active {
    background-color: #d1d1d1;
}

</style>

<script setup>
import { ref, onMounted } from "vue";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const items = ref({});
const db = getFirestore();
const total_price = ref('');
let list =  {};

onMounted(async () => {
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let localItem = JSON.parse(localStorage.getItem(key));
        await getDoc(doc(db, 'buildings', localItem['build'], 'menu', key))
        .then((doc) =>{
            list[i] = ({id: doc.id, ...doc.data(), count: localItem['count'], build: localItem['build']})
        })
    }
    items.value = list;
    totalPrice()
});

const totalPrice = () => {
    total_price.value = 0;
    for (let i in list) {
        total_price.value += list[i]['price'] * list[i]['count']
    }
}

const addItem = (item) => {
    item.count++;
    localStorage.setItem(item.id, JSON.stringify({count: item.count, build: item.build}));
    totalPrice()
};

const deleteItem = (item) => {
    if (item.count > 0) {
        item.count--;
        localStorage.setItem(item.id, JSON.stringify({count: item.count, build: item.build}));
        totalPrice()
    }
    if (item.count == 0) {
        document.getElementById(item.id).style.display = 'none';
        localStorage.removeItem(item.id);
        totalPrice()
    }
};
const clearBasket = () => {
    localStorage.clear();
    document.getElementById('cards').style.display = 'none';
    total_price.value = 0;
};
</script>