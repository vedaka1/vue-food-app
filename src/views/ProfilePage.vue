<template>
    <div class="main-page">
        <div class="profile-page">
            <div class="user-info">
                <div>login: {{ account.login }}</div>
                <button class="btn" @click="handleSignOut">Выйти</button>
            </div>
            <div v-if="user_reviews != 0">Ваши отзывы:</div>
            <div class="feedback" v-for="review in user_reviews" :key="review.id" :id="review.id">
                <div class="feedback-info">
                    <div class="feedback-info-text">
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
                        <div class="feedback-mark">
                            {{ review.rate }} &starf;
                        </div>
                    </div>
                    <p>
                        {{ review.review }}
                    </p>
                </div>
                <button class="delete-btn" @click="delete_review(review.id)">Удалить</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-page {
    width: 100%;
    max-width: 800px;
}
.user-info {
    margin-top: 50px;
    padding: 10px 0;
    width: 100%;
    display: flex;
    color: gray;
    align-items: center;
    justify-content: space-between;
    max-width: 800px;
}
.feedback-info {
    text-align: left;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.8em;
}
.feedback-info span {
    font-size: 0.8em;
    color: gray;
    width: 100%;
}
.feedback-info-text {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 0;
    gap: 10px;
    padding-bottom: 5px;
}
.feedback-mark {
    color: rgb(255, 168, 54);
    width: 40px;
}
.feedback {
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    text-align: left;
    margin-top: 10px;
    display: flex;
    height: fit-content;
}
p {
    font-size: 1em;
    color: gray;
    word-wrap: break-word;
}
.delete-btn {
    max-width: fit-content;
    padding: 0 10px;
    margin: 0;
    /* height: 40px; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    /* outline: 0; */
    border: none;
    font-size: 0.6em;
    flex-grow: 1;
    box-shadow: none;
}
.delete-btn:active {
    background-color: #d1d1d1;
}
.delete-btn:hover {
    background-color: #e4e4e4;
}
.btn {
    width: 100px;
    margin: 0;
}
</style>

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { getDocs, getDoc, doc, getFirestore, query, where, collection, deleteDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const db = getFirestore()
const account = ref([])
const user_reviews = ref([]);
const user = getAuth().currentUser.uid;
const router = useRouter();
const q = query(collection(db, 'reviews'), where('user', '==', user))
let auth = getAuth();

onMounted(async () => {
    const userRef = await getDoc(doc(db, 'users', user));
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
    user_reviews.value = fbReview;
    user_reviews.value.forEach((review) => {
        review.date = new Date(review.date * 1)
    })
    account.value = userRef.data();
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};

const delete_review = async (id) => {
    await deleteDoc(doc(db, 'reviews', id));
    document.getElementById(id).style.display = 'none';
}
</script>

