<template>
    <div class="main-page">
        <div class="head-text">
            <img class="card-img" :src="item.img_url" alt="food image" >
            <div class="item-info">
                <p>
                    {{ item.type }} 
                    {{ item.name }} 
                    <span class="feedback-mark">
                        {{ item.rate }} &starf;
                    </span>
                </p>
                <div>{{ item.price }} ₽</div>
            </div>
        </div>
        <div class="feedback-list">
            Отзывы:
            <RouterLink :to="{name: 'review', params: {id: id, food_id: food_id} }">
                <button class="btn-review">Добавить</button>
            </RouterLink>
            <div class="feedback" v-for="review in reviews" :key="review.id">
                <div class="feedback-info">
                    <div>
                        {{ review.user_login }} 
                        <span>
                            {{ review.date.toLocaleString("ru",{
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        }) }}
                        </span>
                    </div>
                    <div class="feedback-mark">
                        {{ review.rate }} &starf;
                    </div>
                </div>
                <p>
                    {{ review.review }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.head-text {
    width: 100%;
    max-width: 800px;
    height: 20vh;
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    border-radius: 20px;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 100;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    animation: 0.5s show ease;
    background-color: var(--items-color);
}
@keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
}

.card-img {
    display: flex;
    height: 100%;
    width: 100%;
    flex-basis: 50%;
    border-radius: 15px;
    object-fit: cover;
    overflow: hidden;
    object-position: 50% 50%;
}
.item-info {
    color: var(--text-color);
    font-size: 0.7em;
    height: 100%;
    flex-grow: 1;
    padding: 10px;
    width: auto;
    display: flex;
    flex-direction: column;
    text-align: end;
    justify-content: space-between;
}
.feedback-list {
    text-align: center;
    width: 100%;
    max-width: 800px;
}
.feedback-info {
    text-align: left;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    font-size: 0.8em;
}
.feedback-info span {
    font-size: 0.8em;
    color: var(--text-second-color);
}
.feedback-mark {
    color: rgb(255, 168, 54);
}
.feedback {
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    text-align: left;
    margin-top: 10px;
    background-color: var(--items-color);
}
.feedback p {
    font-size: 0.7em;
    color: var(--text-second-color);
    word-wrap: break-word;
}
a:active,
a:hover,
a::after {
    text-decoration: none;
    background-color: none;
    color: none;
    -webkit-tap-highlight-color: transparent;
}
.btn-review {
    outline: 0;
    border: none;
    border-radius: 20px;
    padding: 10px;
    margin-left: 10px;
    background-color: var(--btn-second-color);
    color: var(--text-color);
}
.btn-review:active {
    background-color: #d1d1d1;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getFirestore, doc, getDoc, getDocs, query, where, collection} from "firebase/firestore";
import { getStorage, ref as storageRef , getDownloadURL } from "firebase/storage";

const id = useRouter().currentRoute.value.params.id;
const food_id = useRouter().currentRoute.value.params.food_id;
const item = ref([]);
const db = getFirestore();
const storage = getStorage();
const q = query(collection(db, 'reviews'), where('food_id', '==', food_id))
const reviews = ref([])

onMounted(async () => {  
    const cardIdRef = await getDoc(doc(db, 'buildings', id, 'menu', food_id));
    let fbCard = [];
    fbCard = cardIdRef.data(); 
    if (fbCard.img_url != '') {
        fbCard.img_url = await getDownloadURL(storageRef(storage, fbCard.img_url))
    } else {
        fbCard.img_url = await getDownloadURL(storageRef(storage,'stolovka-images/not-found.png'))
    }
    item.value = fbCard;
    let fbReview = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        fbReview.push({id: doc.id, ...doc.data() });
    });
    fbReview.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }
        return 0;
    });
    reviews.value = fbReview;
    reviews.value.forEach((review) => {
        review.date = new Date(review.date * 1)
    });
});
</script>