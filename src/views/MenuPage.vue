<template>
    <div class="main-page">
        <TopBar/>
        <h1>{{ name }}</h1>
        <BottomBar/>
    </div>
</template>

<style scoped>

.main-page {
    width: 100vw;
    height: 83vh;
    margin-top: 7vh;
    margin-bottom: 10vh;
    display: flex;
    justify-content: center;
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
    }
}
</script>

<script setup>
import { ref, onMounted } from "vue";

const name = ref([])
onMounted(async () => {
  name.value = 'САФУ';
});

</script>