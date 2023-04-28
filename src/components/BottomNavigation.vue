<template>
    <div class="main">
        <RouterLink to='/'>
            <button class="btn" name="login" id="login">
                <img class="icon" src="../icons/food-icon-gray.png" alt="+"> Меню
            </button>
        </RouterLink>
        <RouterLink to='/'>
            <button class="btn" name="login" id="login">
                <img class="icon" src="../icons/gps-gray.png" alt="+"> Столовые
            </button>
        </RouterLink>
        <RouterLink to='/'>
            <button class="btn" name="login" id="login">
                <img class="icon" src="../icons/basket-gray.png" alt="+"> Корзина
            </button>
        </RouterLink>
    </div>
</template>

<style scoped>

.font{
  font-size: 0.8em;
  font-family: 'Roboto', sans-serif;
}

.main {
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  color: white;
  font-family: 'Roboto', sans-serif;
}

a {
    text-decoration: none;
    outline: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
}

.btn {
    flex-grow: 1;
    color: black;
    background-color: white;
    border: none;
    outline: 0;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.icon {
    width: 35px;
    height: 35px;
    background-size: contain;
    background-repeat: no-repeat;
    align-self: center;
    margin-bottom: 5px;
    user-select: none;
}

a:nth-child(1):active img {
    content: url('../icons/food-icon-black.png')
}

a:nth-child(2):hover img {
    content: url('../icons/gps-black.png');
}

a:nth-child(3):active img {
    content: url('../icons/basket-black.png');
}
</style>