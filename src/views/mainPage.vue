<template>
    <div class="main-page">
        <TopBar/>
        <div class="head-text">Доступные меню:</div>
        <RouterLink to="/">
            <button class="item">
                Главный корпус САФУ<br>
                наб. Северной Двины 17
            <!-- <img class="icon" src="../icons/main-build.jpg" alt="Главный корпус"> -->
        </button>
        </RouterLink>
        <BottomBar/>
    </div>
</template>

<style scoped>

.main-page {
    width: 90vw;
}
.head-text {
    margin-top: 10px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90vw;
    height: 40px;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 100;
    
    /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3); */
}

a {
    text-decoration: none;
}

.item {
    width: 40vw;
    height: 50vw;
    background-color: white;
    border: none;
    border-radius: 15px;
    background-image: url('../icons/main-build.jpg');
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-size: 250%;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 5px;
    margin-top: 10px;
    font-size: 0.7rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
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