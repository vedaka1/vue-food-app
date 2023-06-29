<template>
    <div class="main-page">
        <div class="header">
            <input type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="file-input">
            <img src="#" alt="" id="image">  
        </div>
        <input type="text" class="data-input" placeholder="Название" id="dish">
        <input type="number" class="data-input" placeholder="Цена" id="price">
        <input type="text" class="data-input" placeholder="Тип блюда" id="type">
        <button class="btn" @click="add()" id="btn">Загрузить</button>
    </div>
</template>
<style scoped>
.header {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    height: 200px;
    width: 100%;
    position: relative;
    border-radius: 20px;
    background-color: var(--items-color);
    overflow: hidden;
    max-width: 800px;
}
.header input {
    position: absolute;
    top: 85px;
    border-radius: 20px;
    background: var(--navigation-color);
    backdrop-filter: blur(15px);
}
.header input::-webkit-file-upload-button {
    /* width: 100%; */
    padding: 10px;
    border: none;
    border-radius: 20px;
}
img {
    width: 100%;
    object-fit: cover;
}
.hours-input {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
    max-width: 800px;
}
.hours-input .data-input {
    margin-top: 0;
    text-align: center;
}
.data-input {
    width: 100%;
    max-width: 800px;
    height: 50px;
    margin-top: 10px;
    border-radius: 20px;
    padding: 10px;
    border: none;
    background: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    /* background-image: url('../icons/basket.png');
    background-repeat: no-repeat;
    background-size: auto 60%;
    background-position: 10px; */
}
.btn {
    max-width: 400px;
}
</style>
<script setup>
import router from '@/router';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const db = getFirestore();
const storage = getStorage();
const id = useRouter().currentRoute.value.params.id;
let file;

onMounted(() => {
    let file_input = document.getElementById('file-input');
    document.getElementById('file-input').addEventListener('input', () => {
        file = file_input.files[0];
        let image = document.getElementById('image')
        image.src = URL.createObjectURL(file);
    })
})

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
const add = async () => {
    const dish = document.getElementById('dish').value;
    const type = document.getElementById('type').value;
    const price = document.getElementById('price').value;
    if (file && dish && type && price) {
        document.getElementById('btn').ariaDisabled = 'true'
        try {
            uploadBytes(ref(storage,'stolovka-images/food/' + dish + '.'+ file.type.substring(6)), file)
            .then(async () => {
                let img = 'gs://stolovka-app.appspot.com/stolovka-images/food/'+dish+'.'+file.type.substring(6);
                if ((dish && type && price) != 0) {
                    await setDoc(
                        doc(collection(db, 'buildings', id, 'menu')), 
                        {   
                            name: dish,
                            price: price,
                            rate: 0,
                            type: type,
                            img_url: img,   
                        });
                } else {
                    raise_modal('Не добавлено', '#ff6363')
                }
            })
            .then(() => {
                router.go(-1);
            })  
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }
}
</script>