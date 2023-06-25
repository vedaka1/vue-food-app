<template>
    <div class="main-page">
        <div class="head-text">
            <div class="head-items">
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
            <button v-if="user_role" class="btn delete-card-btn" @click="deleteCard(item)">Удалить</button>
        </div>
        <div class="feedback-list">
            Отзывы:
            <RouterLink :to="{name: 'review', params: {id: id, food_id: food_id} }">
                <button class="btn-review">Добавить</button>
            </RouterLink>
            <div class="feedback" v-for="review in reviews" :key="review.id" :id="review.id">
                <div class="feedback-main">
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
                <button v-if="user_role" class="btn delete-review-btn" @click="deleteReview(review.id)">Удалить</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.head-text {
    width: 100%;
    max-width: 800px;
    height: 100%;
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
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
.head-items {
    width: 100%;
    height: 100%;
    display: flex;
}

.card-img {
    display: flex;
    height: 150px;
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
    height: 150px;
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
    font-size: 1em;
}
.feedback {
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    display: flex;
    text-align: left;
    margin-top: 10px;
    background-color: var(--items-color);
}
.feedback p {
    font-size: 0.7em;
    color: var(--text-second-color);
    word-wrap: break-word;
}
.feedback-main {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-right: 10px;
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
.delete-card-btn {
    color: white;
    height: 40px;
    background-color: #ff3b3b;
    padding: 10px;
    font-size: 0.7em;
}
.delete-review-btn {
    color: white;
    margin: 0;
    height: 100%;
    background-color: #ff3b3b;
    padding: 10px;
    width: fit-content;
    font-size: 0.8em;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getFirestore, doc, getDoc, getDocs, query, where, collection, deleteDoc, setDoc} from "firebase/firestore";
import { getStorage, ref as storageRef , getDownloadURL, deleteObject } from "firebase/storage";
import { getRole } from "@/user";
import { getAuth } from "firebase/auth";
import router from "@/router";

const id = useRouter().currentRoute.value.params.id;
const food_id = useRouter().currentRoute.value.params.food_id;
const item = ref([]);
const user = getAuth().currentUser.uid;
const db = getFirestore();
const storage = getStorage();
const q = query(collection(db, 'reviews'), where('food_id', '==', food_id))
const reviews = ref([])
let user_role;
let total_rate = 0;
let fbReview = [];
onMounted(async () => { 
    user_role = await getRole(user); 
    const cardIdRef = await getDoc(doc(db, 'buildings', id, 'menu', food_id));
    let fbCard = [];
    fbCard = cardIdRef.data(); 
    if (fbCard.img_url != '') {
        fbCard.img_url = await getDownloadURL(storageRef(storage, fbCard.img_url));
        fbCard['img_name'] = (storageRef(storage, fbCard.img_url)).fullPath;
    } else {
        fbCard.img_url = await getDownloadURL(storageRef(storage,'stolovka-images/not-found.png'));
        fbCard['img_name'] = (storageRef(storage, 'stolovka-images/not-found.png')).fullPath;
    }
    fbCard.rate = (parseFloat(fbCard.rate)).toFixed(1)
    item.value = fbCard;
    fbReview = [];
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

const deleteCard = async (card) => {
    fbReview.forEach( async (doc_item) => {
        await deleteDoc(doc(db, 'reviews', doc_item.id))
    })
    await deleteDoc(doc(db, 'buildings', id, 'menu', food_id));
    if (card.img_name != 'stolovka-images/not-found.png') {
        deleteObject(storageRef(storage, card.img_name ))
        .catch((error) => {
            console.log(error);
        });
    }
    router.go(-1);
}
const deleteReview = async (review_id) => {
    if (user_role == 'admin') {
        await deleteDoc(doc(db, 'reviews', review_id));
        document.getElementById(review_id).classList.add('visible')
        setTimeout(() => {
            document.getElementById(review_id).style.display = 'none';
        }, 1000);
        let reviews_counter = 0;
        let counter = 0;
        const querySnapshot = await getDocs(query(collection(db, 'reviews'), where('food_id', '==', food_id)));
        querySnapshot.forEach((doc) => {
            reviews_counter += 1;
            counter += parseInt(doc.data().rate);
        });
        if (reviews_counter != 0) {
            total_rate = (counter / reviews_counter).toFixed(6);
        }

        await setDoc(
            doc(db, 'buildings', id, 'menu', food_id),
            {rate: total_rate},
            {merge: true}
        )
    } else {
        console.log('Недостаточно прав!');
    }
}
</script>