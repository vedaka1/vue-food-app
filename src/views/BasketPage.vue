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
                    <button class="btn" id="deleteItem" @click="deleteItem(item)">
                        &minus;
                    </button>
                    {{ item.count }}
                    <button class="btn" id="addItem" @click="addItem(item)">&plus;</button>
                </div> 
            </div>       
        </div>
        <div class="footer">
            Сумма заказа: <br>
            {{ total_price }} ₽
            <div>
                <button @click="clearBasket">Очистить</button>
                <button @click="addSpend">Заказать</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cards {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 800px;
}
.card {
    width: 100%;
    max-width: 1000px;
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
.info {
    font-size: 0.9em;
}
.header {
    text-align: center;
    margin-top: 7vh;
    margin-bottom: 10px;
}
.btn {
    max-width: 30px;
    margin: 0;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    /* outline: 0; */
    border: none;
    font-size: 1.3em;
    flex-grow: 1;
    box-shadow: none;
}
.btn:active {
    background-color: #d1d1d1;
}

.card-buttons {
    height: 100%;
    width: 100px;
    display: flex;
    justify-content: space-between;
    column-gap: 5px;
    align-items: center;
}
.footer {
    /* width: 100%; */
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 7vh;
}
.footer button {
    outline: 0;
    border: none;
    border-radius: 20px;
    padding: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
}

.footer button:active {
    background-color: #d1d1d1;
}

</style>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth"
import { getFirestore, collection, setDoc, doc} from "firebase/firestore"

const items = ref({});
const total_price = ref('');
let list =  {};
const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser.uid;
const usersRef = collection(db, "users", user, "spendings");

const date = new Date().getTime().toString();
const dishesList = {};

onMounted(async () => {
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = JSON.parse(localStorage.getItem(key));
        list[i] = item;
        dishesList[i] = {name: item.name, count: item.count, price: item.price };
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
    localStorage.setItem(item.id, JSON.stringify(item));
    totalPrice()
};

const deleteItem = (item) => {
    if (item.count > 0) {
        item.count--;
        localStorage.setItem(item.id, JSON.stringify(item));
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

const raise_modal = (text, color) => {
    let modal = document.getElementById('modal');
    modal.style.backgroundColor = color;
    modal.classList.add('visible');
    modal.innerText = text;
    let timer = setTimeout(() => {
        document.getElementById('modal').classList.remove('visible');
    }, 1000);
    if (!clearTimeout(timer)) {
        setTimeout(() => {
            document.getElementById('modal').classList.remove('visible');
        }, 1000);
    }
}

const addSpend = async () => {
    if (localStorage.length > 0) {
        for (let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            let item = JSON.parse(localStorage.getItem(key));
            dishesList[i] = {name: item.name, count: item.count, price: item.price };
        }
        await setDoc(
            doc(usersRef), 
            {   amount: total_price.value,
                date: date,
                dishes: dishesList,
            })
            .then(() =>{
                raise_modal('Успешно!', 'lightgreen')
            })
    } else {
        raise_modal('Корзина пуста!', 'red')
    }
    localStorage.clear();
    document.getElementById('cards').style.display = 'none';
    total_price.value = 0;
}
</script>