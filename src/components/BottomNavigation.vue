<template>
    <div class="bottom-bar">
        <div class="icons">
            <RouterLink to='/'>
            <button class="btn-nav" name="login">
                <img class="icon" src="../icons/food-icon-black.png" alt="+"> 
                Меню
            </button>
            </RouterLink>
            <RouterLink to='/SpendingsPage'>
                <button class="btn-nav" name="login">
                    <img class="icon" src="@/icons/wallet.png" alt="+">
                    Траты
                </button>
            </RouterLink>
            <RouterLink to='/BasketPage'>
                <button class="btn-nav" name="login">
                    <img class="icon" src="../icons/basket-black.png" alt="+">
                    Корзина
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  width: 100%;
  align-items: center;
  color: white;
  font-family: 'Roboto', sans-serif;
  height: 50px;
  background: rgb(240 240 240);
  border-radius: 30px 30px 0 0;
  z-index: 1;
  border-top: 0.7px solid lightgray;
  justify-content: center;
}

a {
    text-decoration: none;
    outline: 0;
    flex-grow: 1;   
    display: flex;
    background-color: none;
    flex-basis: 33%;
}
.icons {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
}
a:active,
a:hover,
a::after {
    text-decoration: none;
    background-color: none;
    color: none;
    -webkit-tap-highlight-color: transparent;
}

.btn-nav {
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
</style>