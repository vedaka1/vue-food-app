<template>
    <div class="main-page">
        <textarea name="review" id="review" v-model="review" placeholder="Отзыв" class="text-input"></textarea>
        <div class="rating-area">
            <input type="radio" id="star-1" name="rating" value="5">
            <label for="star-1" title="Оценка «1»"></label>
            <input type="radio" id="star-2" name="rating" value="4">
            <label for="star-2" title="Оценка «2»"></label>    
            <input type="radio" id="star-3" name="rating" value="3">
            <label for="star-3" title="Оценка «3»"></label>  
            <input type="radio" id="star-4" name="rating" value="2">
            <label for="star-4" title="Оценка «4»"></label>    
            <input type="radio" id="star-5" name="rating" value="1">
            <label for="star-5" title="Оценка «5»"></label>	
        </div>
        <div class="buttons">
            <button class="btn" @click="saveReview">Сохранить</button>
        </div>
    </div>
</template>

<style scoped>
.main-page {
    margin-top: 50px;
    padding-bottom: 50px;
    padding: 10px;
}
.text-input {
    width: 100%;
    max-width: 800px;
    /* margin: 10px; */
    height: 200px;
    border-radius: 20px;
    padding: 10px;
    outline: 0;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    vertical-align: top;
    word-wrap: break-word;
    text-overflow: clip;
    resize: none;
    color: var(--text-color);
    background-color: var(--items-color);
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.btn {
    outline: 0;
    border: none;
    border-radius: 20px;
    padding: 10px;
}

label:active,
label:hover,
label::after {
    text-decoration: none;
    background-color: none;
    color: none;
    -webkit-tap-highlight-color: transparent;
}
.rating-area {
    overflow: hidden;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    padding: 10px;
}

.rating-area:not(:checked) > input {
    display: none;  
}

.rating-area:not(:checked) > label {
    text-align: center;
    float: right;
    width: 42px;
    padding: 0;
    cursor: pointer;
    font-size: 32px;
    line-height: 32px;
    color: lightgrey;
}

.rating-area:not(:checked) > label:before {
    content: '★';
}

.rating-area > input:checked ~ label {
    color: gold;
}

.rating-area:not(:checked) > label:hover,
.rating-area:not(:checked) > label:hover ~ label {
    color: gold;
}

.rating-area > input:checked + label:hover,
.rating-area > input:checked + label:hover ~ label,
.rating-area > input:checked ~ label:hover,
.rating-area > input:checked ~ label:hover ~ label,
.rating-area > label:hover ~ input:checked ~ label {
    color: gold;
}
.rate-area > label:active {
    position: relative;
}
</style>

<script setup>
import { ref, onMounted } from "vue"
import { getAuth } from "firebase/auth"
import { getFirestore, collection, setDoc, getDoc, doc, where, query, getCountFromServer } from "firebase/firestore"
import { useRouter } from "vue-router";

const db = getFirestore();
const auth = getAuth();
const review = ref("");
const router = useRouter();
const reviewRef = collection(db, "reviews")
const id = useRouter().currentRoute.value.params.id;
const food_id = useRouter().currentRoute.value.params.food_id;
const user = getAuth().currentUser.uid;
const q = query(collection(db, 'reviews'), where('food_id', '==', food_id))
let food_rate = '';
let login = '';
let rate = '';

onMounted(async () => {
    const userRef = await getDoc(doc(db, 'users', user));
    food_rate = await getDoc(doc(db, 'buildings', id, 'menu', food_id))
    login = userRef.data().login;
})

const saveReview = async () => {
    let ratings = document.getElementsByName('rating');
    for (let i in ratings) {
        if (ratings[i].checked){
            rate = ratings[i].value;
        }
    }
    if (review.value != 0) {
        await setDoc(
        doc(reviewRef), 
        {   
            user: auth.currentUser.uid,
            user_login: login,
            building: id,
            food_name: food_rate.data().name,
            food_id: food_id,
            review: review.value,
            rate: rate,
            date: new Date().getTime().toString()
        });
        let total_reviews = await getCountFromServer(q);
        let total_rate;
        if (total_reviews.data().count != 0) {
            total_rate = (
                ((total_reviews.data().count -= 1) * parseFloat(food_rate.data().rate) + parseInt(rate)) / (total_reviews.data().count)
            ).toFixed(6);
        } else {
            total_rate = parseInt(rate) / 1;
        }
    await setDoc(
        doc(db, 'buildings', id, 'menu', food_id),
        {rate: total_rate},
        {merge: true}
    )
    router.go(-1)
    }
}
</script>