<template>
    <div class="main-page">
        
        <div class="header">
            Корзина:
        </div>
        <div class="cards" id="cards">
            <div v-for="item in items" :key="item.id" class="card" :id="item.id">
                <div class="info">
                    {{ item.name }}<br>
                    {{ item.price }} ₽ 
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
    background-color: var(--items-color);
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
    align-items: center;
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
    margin-top: 50px;
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
    bottom: 50px;
}
.footer button {
    outline: 0;
    border: none;
    border-radius: 20px;
    padding: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: var(--btn-second-color);
    color: var(--text-color);
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

onMounted(async () => {
    let storage = JSON.parse(localStorage.getItem(user));
    list = storage.basket;
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
    let storage = JSON.parse(localStorage.getItem(user));
    storage.basket[item.id] = item;
    localStorage.setItem(user, JSON.stringify(storage));
    totalPrice()
};

const deleteItem = (item) => {
    let storage = JSON.parse(localStorage.getItem(user));
    if (item.count > 0) {
        item.count--;
        storage.basket[item.id].count = item.count;
        localStorage.setItem(user, JSON.stringify(storage))
        totalPrice()
    }
    if (item.count == 0) {
        document.getElementById(item.id).style.display = 'none';
        delete storage.basket[item.id];
        localStorage.setItem(user, JSON.stringify(storage))
        totalPrice()
    }
};

const clearBasket = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'theme') {
            localStorage.removeItem(key);
        }
    }
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
        let storage = JSON.parse(localStorage.getItem(user));
        await setDoc(
            doc(usersRef), 
            {   amount: total_price.value,
                date: date,
                dishes: storage.basket,
            })
            .then(() =>{
                raise_modal('Успешно!', 'lightgreen')
            })
    } else {
        raise_modal('Корзина пуста!', '#ff6363')
    }
    localStorage.clear();
    document.getElementById('cards').style.display = 'none';
    total_price.value = 0;
}
</script>