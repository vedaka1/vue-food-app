<template>
    <div class="main">
        <RouterLink to='/MainPage'>
            <button class="btn" name="login">
                <img v-if="a" class="icon" src="../icons/food-icon-black.png" alt="+"> 
                <img v-else class="icon" src="../icons/food-icon-gray.png" alt="+">
                Меню
            </button>
        </RouterLink>
        <RouterLink to='/LocationPage'>
            <button class="btn" name="login">
                <img v-if="b" class="icon" src="../icons/gps-black.png" alt="+">
                <img v-else class="icon" src="../icons/gps-gray.png" alt="+">
                Столовые
            </button>
        </RouterLink>
        <RouterLink to='/BasketPage'>
            <button class="btn" name="login">
                <img v-if="c" class="icon" src="../icons/basket-black.png" alt="+">
                <img v-else class="icon" src="../icons/basket-gray.png" alt="+">
                Корзина
            </button>
        </RouterLink>
    </div>
</template>

<script setup>
let a, b, c = false
if (window.location.hash == '#/MainPage') {a = true} 
if (window.location.hash == '#/LocationPage') {b = true} 
if (window.location.hash == '#/BasketPage') {c = true} 
</script>

<style scoped>

.main {
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  width: 100vw;
  color: white;
  font-family: 'Roboto', sans-serif;
  height: 7vh;
  background-color: rgb(255, 255, 255, 1);
  backdrop-filter: blur(15px);
  border-radius: 30px 30px 0 0;
}

a {
    text-decoration: none;
    outline: 0;
    flex-grow: 1;
    display: flex;
    background-color: none;
    flex-basis: 33%;
}

a:active,
a:hover,
a::after {
    text-decoration: none;
    background-color: none;
    color: none;
    -webkit-tap-highlight-color: transparent;
}

.btn {
    flex-grow: 1;
    color: black;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    outline: 0;
    border-radius: 10px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7rem;
}

.icon {
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    align-self: center;
    margin-bottom: 3px;
    user-select: none;
}

a:nth-child(1):active img {
    content: url('../icons/food-icon-black.png')
}

a:nth-child(2):active img {
    content: url('../icons/gps-black.png');
}

a:nth-child(3):active img {
    content: url('../icons/basket-black.png');
}

</style>