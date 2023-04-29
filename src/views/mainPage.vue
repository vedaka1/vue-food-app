<template>
    <div class="main-page">
        <TopBar/>
        <div class="head-text">Доступные меню:</div>
        <div class="carousel">
            <RouterLink to="/">
                <button class="item">
                    Главный корпус САФУ<br>
                    наб. Северной Двины 17
                <!-- <img class="icon" src="../icons/main-build.jpg" alt="Главный корпус"> -->
                </button>
            </RouterLink>
            <RouterLink to="/">
                <button class="item">
                    Главный корпус САФУ<br>
                    наб. Северной Двины 17
                <!-- <img class="icon" src="../icons/main-build.jpg" alt="Главный корпус"> -->
                </button>
            </RouterLink>
            <RouterLink to="/">
                <button class="item">
                    Главный корпус САФУ<br>
                    наб. Северной Двины 17
                <!-- <img class="icon" src="../icons/main-build.jpg" alt="Главный корпус"> -->
                </button>
            </RouterLink>
            <RouterLink to="/">
                <button class="item">
                    Главный корпус САФУ<br>
                    наб. Северной Двины 17
                <!-- <img class="icon" src="../icons/main-build.jpg" alt="Главный корпус"> -->
                </button>
            </RouterLink>
            <RouterLink to="/">
                <button class="item">
                    Главный корпус САФУ<br>
                    наб. Северной Двины 17
                <!-- <img class="icon" src="../icons/main-build.jpg" alt="Главный корпус"> -->
                </button>
            </RouterLink>
            <RouterLink to="/">
                <button class="item">
                    Главный корпус САФУ<br>
                    наб. Северной Двины 17
                <!-- <img class="icon" src="../icons/main-build.jpg" alt="Главный корпус"> -->
                </button>
            </RouterLink>
            <RouterLink to="/">
                <button class="item">
                    Главный корпус САФУ<br>
                    наб. Северной Двины 17
                <!-- <img class="icon" src="../icons/main-build.jpg" alt="Главный корпус"> -->
                </button>
            </RouterLink>
            <RouterLink to="/">
                <button class="item">
                    Главный корпус САФУ<br>
                    наб. Северной Двины 17
                <!-- <img class="icon" src="../icons/main-build.jpg" alt="Главный корпус"> -->
                </button>
            </RouterLink>
        </div>
        <BottomBar/>
    </div>
</template>

<style scoped>

.main-page {
    width: 100vw;
    height: 90vh;
    margin-top: 7vh;
    margin-bottom: 10vh;
    /* padding: 10px; */
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

.carousel {
    display: flex;
    flex-direction: row;
    /* flex-grow: 1; */
    /* height: 60vh; */
    width: 100%;
    /* max-height: 50vw; */
    overflow: scroll;
    padding: 10px 10px 10px 0;
    border-radius: 15px;
    flex-wrap: wrap;
    flex-grow: 1;
}

a {
    text-decoration: none;
    padding-left: 10px;
    padding-top: 10px;
    height: 30vh;
    /* min-width: 40vw; */
    flex-basis: 50%;
}

a .item {
    width: 100%;
    height: 100%;
    background-color: white;
    border: none;
    border-radius: 15px;
    background-image: url('../icons/main-build.jpg');
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-size: 250%;
    background-attachment: local;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 5px;
    font-size: 0.7rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

@media (min-width: 1000px) {
    .carousel {
        height: 25vh;
    }

    a {
        width: 20vw;
        height: 100%;
    }
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