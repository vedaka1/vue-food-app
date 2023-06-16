<template>
    <div class="main-page">
        <header>Ваши траты:</header>
        <div class="spendings-list" v-for="spending in spendings" :key="spending.id">
            <div class="spending-item">
                <div class="spending-item-info">
                    <p class="item-info">
                        <span>Чек от {{ spending.date.toLocaleString("ru",{
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        }) }}<br>
                        # {{ spending.id }}
                        </span> 
                    </p>
                    <p>{{ spending.amount }} ₽</p>
                </div>
                <div class="dish-list" v-for="dish in spending.dishes" :key="dish">
                    <span class="dish-info">{{ dish.name }}</span> <p>{{ dish.count }} &#215; {{ dish.price }} ₽</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
header {
    margin-top: 50px;
    margin-bottom: 10px;
}
.spendings-list {
    width: 100%;
    max-width: 800px;
}
.spending-item {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}
.spending-item-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid gray;
    align-items: center;
}
.item-info {
    font-size: 0.9em;
}
.item-info span {
    font-size: 0.7em;
}
.dish-list {
    font-size: 0.9em;
    display: flex;
}
.dish-info {
    width: 100px;
    text-align: left;
}
.dish-list p {
    color: gray;
}
</style>

<script setup>
import { getAuth} from "firebase/auth";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { onMounted, ref } from "vue";

const db = getFirestore()
const user = getAuth().currentUser.uid;
const spendings = ref([])

onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, `users`, user, 'spendings'));
    const fbList = [];
    querySnapshot.forEach((doc) => {
        fbList.push({ id: doc.id, ...doc.data() });
        });
    fbList.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }
        return 0;
    });
    spendings.value = fbList;
    spendings.value.forEach((spending) => {
        spending.date = new Date(spending.date * 1)
    })
})

</script>