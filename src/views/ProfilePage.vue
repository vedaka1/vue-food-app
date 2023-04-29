<template>
    <div>
        <TopBar/>
        <div class="main-page">Тут будут ваши данные </div>
        <BottomBar/>
    </div>
</template>

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

<style scoped>

.main-page {
    width: 100vw;
    height: 83vh;
    margin-top: 7vh;
    margin-bottom: 10vh;
    text-align: center; 
}

</style>

